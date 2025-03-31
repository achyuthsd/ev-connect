import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "./firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import "./Booking.css";
import emailjs from '@emailjs/browser';

const sendEmail = (bookingDetails) => {
  const { userEmail, stationName, portNumber, date, time } = bookingDetails;

  // Debugging: Check if email is valid
  if (!userEmail) {
    console.error("❌ Email is missing in booking details.");
    return;
  }

  console.log('📧 Sending email to:', userEmail); // Log email before sending

  const templateParams = {
    to_email: userEmail,  // Make sure this is passed directly to EmailJS
    user_name: auth.currentUser.displayName || "User",  // Use display name or fallback to "User"
    station_name: stationName,
    port_number: portNumber,
    booking_date: date,
    booking_time: time,
  };

  console.log('🚨 Template Params:', templateParams); // Log template params to check the email

  emailjs
    .send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((response) => {
      console.log('✅ Email sent:', response.status, response.text);
    })
    .catch((error) => {
      console.error('❌ Failed to send email:', error);
    });
};


const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get("date");
  const station = queryParams.get("station");
  const port = queryParams.get("port");

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [reservedSlots, setReservedSlots] = useState({});
  const [userId, setUserId] = useState(null);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!auth.currentUser) return;

      setUserId(auth.currentUser.uid);

      const q = query(
        collection(db, "reservations"),
        where("date", "==", date),
        where("station", "==", station),
        where("port", "==", port)
      );

      const querySnapshot = await getDocs(q);
      let slotsData = {};

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.slots.forEach((slot) => {
          slotsData[slot] = data.userId;
        });
      });

      setReservedSlots(slotsData);
    };

    fetchReservations();
  }, [date, station, port]);

  const toggleSlot = (hour) => {
    setSelectedSlots((prev) =>
      prev.includes(hour) ? prev.filter((h) => h !== hour) : [...prev, hour]
    );
  };

  const handleConfirm = async () => {
    if (!auth.currentUser) {
      alert("Please login!");
      navigate("/ev-connect/login");
      return;
    }

    const userEmail = auth.currentUser.email;

    if (!userEmail) {
      alert("Email not available for user.");
      console.error("❌ User email not available");
      return;
    }

    console.log('📧 Confirming booking for user:', userEmail); // Log email for confirmation

    try {
      // Store the booking in Firestore
      await addDoc(collection(db, "reservations"), {
        userId: auth.currentUser.uid,
        date,
        station,
        port,
        slots: selectedSlots,
        timestamp: new Date(),
      });

      // Send booking confirmation email
      sendEmail({
        userEmail: userEmail,
        stationName: station,
        portNumber: port,
        date: date,
        time: selectedSlots.join(", "),
      });

      alert("Booking confirmed!\nBooking details has been sent to your mail.");
      navigate("/ev-connect/");
    } catch (error) {
      console.error("Error booking slot:", error);
    }
  };

  return (
    <div className="cont1">
      <div className="main-booking">Select a time slot</div>
      <div className="main-book">
        Day: <span className="gold">{date}</span> <br /> Station: <span className="gold">Station {station}</span> <br /> Port: <span className="gold">Port {port}</span>
      </div>

      <div className="descbook">
        *Please select the time slots you want to book by clicking on them and click "Confirm Booking" to confirm your booking
      </div>

      <div className="one">
        <button className="trans"></button>
        <div className="avalslot">- available slots</div>
      </div>
      <div className="one two">
        <button className="trans trans2"></button>
        <div className="avalslot bookuslot">- slots booked by you</div>
      </div>
      <div className="one three">
        <button className="trans trans3"></button>
        <div className="avalslot bookoslot">- slots booked by others</div>
      </div>

      <div
        className="slots"
        
      >
        {hours.map((hour) => {
          let bgColor = "white";
          let color = "black";

          if (reservedSlots[hour]) {
            bgColor = reservedSlots[hour] === userId ? "rgb(98, 98, 241)" : "rgba(241, 63, 63, 0.82)";
            color = "white";
          } else if (selectedSlots.includes(hour)) {
            bgColor = "rgba(98, 245, 85, 0.82)";
            color = "white";
          }

          return (
            <button
              key={hour}
              onClick={() => toggleSlot(hour)}
              disabled={reservedSlots[hour] && reservedSlots[hour] !== userId}
              style={{
                background: bgColor,
                color: color,
                padding: "10px",
                borderRadius: "10px",
                fontSize: "15px",
                cursor: reservedSlots[hour] && reservedSlots[hour] !== userId ? "not-allowed" : "pointer",
              }}
            >
              {hour}:00 - {hour + 1}:00
            </button>
          );
        })}
      </div>

      <button
        className="conf"
        onClick={handleConfirm}
        style={{ marginTop: "50px", width: "140px", height: "35px", backgroundColor: "rgb(0, 0, 0)", color: "white", borderRadius: "10px" }}
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingPage;

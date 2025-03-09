import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "./firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import "./Booking.css"
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
          slotsData[slot] = data.userId; // Store userId for each reserved slot
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

    try {
      await addDoc(collection(db, "reservations"), {
        userId: auth.currentUser.uid,
        date,
        station,
        port,
        slots: selectedSlots,
        timestamp: new Date(),
      });

      alert("Booking confirmed!");
      navigate("/ev-connect/");
    } catch (error) {
      console.error("Error booking slot:", error);
    }
  };

  return (
    <div className="cont1">
      <div className="main-booking">
        Select a time slot 
      </div>
      <div className="main-book">
      Day: <span className="gold">{date}</span> <br /> Station: <span className="gold">Station {station}</span> <br /> Port:  <span className="gold">Port {port}</span>

      </div>

<div className="descbook">
*Please select the time slots you want to book by clicking on them and click "Confirm Booking" to confirm your booking
</div>
<div className="one">
  <button className="trans"></button>
 
 <div className="avalslot">
 - available slots
  </div> 
</div>
<div className="one two">
  <button className="trans trans2"></button>
 
 <div className="avalslot bookuslot">
 - slots booked by you
  </div> 
</div>
<div className="one three">
  <button className="trans trans3"></button>
 
 <div className="avalslot bookoslot">
 - slots booked by others
  </div> 
</div>

      <div  className="slots" style={{ display: "grid", gridTemplateColumns: "repeat(6, 150px)", gap: "20px" }}>
        {hours.map((hour) => {
          let bgColor = "white"; 
          let color = "black";

          if (reservedSlots[hour]) {
            bgColor = reservedSlots[hour] === userId ? "blue" : "red"; // Blue for user's slots, Red for others
            color = "white"
          } else if (selectedSlots.includes(hour)) {
            bgColor = "rgb(47, 232, 90)"; // Green for currently selected slots
            color="white"
          }

          return (
            <button
              key={hour}
              onClick={() => toggleSlot(hour)}
              disabled={reservedSlots[hour] && reservedSlots[hour] !== userId} // Disable already booked slots by others
              style={{
                background: bgColor,
                color: color,
                padding: "10px",
                borderRadius: "10px",
                fontSize:"15px",
                cursor: reservedSlots[hour] && reservedSlots[hour] !== userId ? "not-allowed" : "pointer",
              }}
            >
              {hour}:00 - {hour+1}:00
            </button>
          );
        })}
      </div>

      <button className="conf"onClick={handleConfirm} style={{ marginTop: "50px", width:"140px",height:"35px", backgroundColor:"rgb(0, 0, 0)",color:"white",borderRadius:"10px" }}>Confirm Booking</button>
    </div>
  );
};

export default BookingPage;

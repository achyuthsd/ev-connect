import React, { useState, useEffect } from 'react';
import "./Selection.css";
import { useNavigate } from 'react-router-dom';

const Selection = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedStation, setSelectedStation] = useState(""); 
  const [date, setDate] = useState("");
  const [station, setStation] = useState("");
  const [port, setPort] = useState("");
  const [selectedPort, setSelectedPort] = useState("");

  // Function to format date in dd-mm-yyyy
  const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  // Get the next three days
  const getNextThreeDays = () => {
    const today = new Date();
    const days = [0, 1, 2].map((offset) => {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + offset);
      return formatDate(futureDate);
    });
    return days;
  };

  const [days, setDays] = useState(getNextThreeDays());

  useEffect(() => {
    // Update the days when the component mounts
    setDays(getNextThreeDays());
  }, []);

  const handleSelectStation = (station) => {
    setSelectedStation(station); 
  };

  const handleClick = (day, index) => {
    if (selectedDay === `Day ${index + 1}`) {
      setSelectedDay(""); // Deselect if it's already selected
      setDate(""); // Clear the date when deselected
    } else {
      setSelectedDay(`Day ${index + 1}`);
      setDate(days[index]); // Set the date corresponding to the selected day
    }
  };

  const handleSelectPort = (port) => {
    setSelectedPort(port);
  };

  const handleConfirm = () => {
    if (date && station && port) {
      navigate(`/ev-connect/booking?date=${date}&station=${station}&port=${port}`);
    } else {
      alert("Please select all options!");
    }
  };

  return (
    <div className='cont'>
      <div className="selectdate">
        <div className="selectdatehead">Select a date</div>
        <div className="selectdatedesc">
          Please select one of the following dates to proceed with your booking <br />*you can only schedule your bookings for the next 3 days*
        </div>
        <div className="days">
          {days.map((day, index) => (
            <div
              key={index}
              id={`day00${index + 1}`}
              className={`day${index + 1} day ${selectedDay === `Day ${index + 1}` ? "active" : ""}`}
              onClick={() => handleClick(day, index)}
            >
             {day}
            </div>
          ))}
        </div>
      </div>

      <div className="selectstation">
        <div className="selectstationhead selectdatehead">Select a station</div>
        <div className="selectstationdesc selectdatedesc">
          Please select one of the stations to proceed with your booking
        </div>
        <div className="stations">
          <div
            className={`stationa station ${selectedStation === "A" ? "active" : ""}`}
            onClick={() => { handleSelectStation("A"); setStation("A"); }}
          >
            <div className="stationimg">
              <i className="fa-solid fa-charging-station hy"></i>
            </div>
            <div className="stationname">Station A</div>
            <div className="stationdesc">
              Voltage: 120V-150V <br />
              Type: Fast & Slow <br />
              Location: Kollam
            </div>
          </div>

          <div
            className={`stationb station ${selectedStation === "B" ? "active" : ""}`}
            onClick={() => { handleSelectStation("B"); setStation("B"); }}
          >
            <div className="stationimg">
              <i className="fa-solid fa-charging-station hy"></i>
            </div>
            <div className="stationname">Station B</div>
            <div className="stationdesc">
              Voltage: 120V-150V <br />
              Type: Fast & Slow <br />
              Location: Alappuzha
            </div>
          </div>

          <div
            className={`stationc station ${selectedStation === "C" ? "active" : ""}`}
            onClick={() => { handleSelectStation("C"); setStation("C"); }}
          >
            <div className="stationimg">
              <i className="fa-solid fa-charging-station hy"></i>
            </div>
            <div className="stationname">Station C</div>
            <div className="stationdesc">
              Voltage: 120V-150V <br />
              Type: Fast & Slow <br />
              Location: Trivandrum
            </div>
          </div>
        </div>
      </div>

      <div className="selectport">
        <div className="selectporthead selectdatehead">Select a port</div>
        <div className="selectportdesc selectdatedesc">
          Please select one of the available charging ports to proceed with your booking
        </div>
      </div>

      <div className="stations ports">
        <div
          className={`porta station ${selectedPort === "001" ? "active" : ""}`}
          onClick={() => { handleSelectPort("001"); setPort("001"); }}
        >
          <div className="portimg hy stationimg">
            <i className="fa-solid fa-plug"></i>
          </div>
          <div className="stationname portname">Port 001</div>
          <div className="stationdesc portdesc">
            Voltage: 120V <br />
            Type: DC Charging
          </div>
        </div>

        <div
          className={`portb station ${selectedPort === "002" ? "active" : ""}`}
          onClick={() => { handleSelectPort("002"); setPort("002"); }}
        >
          <div className="stationimg hy portimg">
            <i className="fa-solid fa-plug"></i>
          </div>
          <div className="stationname portname">Port 002</div>
          <div className="stationdesc portdesc">
            Voltage: 130V <br />
            Type: AC Charging
          </div>
        </div>

        <div
          className={`portc station ${selectedPort === "003" ? "active" : ""}`}
          onClick={() => { handleSelectPort("003"); setPort("003"); }}
        >
          <div className="stationimg hy portimg">
            <i className="fa-solid fa-plug"></i>
          </div>
          <div className="stationname portname">Port 003</div>
          <div className="stationdesc portdesc">
            Voltage: 140V <br />
            Type: Wireless Charging
          </div>
        </div>
      </div>
      <button onClick={handleConfirm} className='selconf'>Confirm</button>
    </div>
  );
};

export default Selection;

import React, { useRef, useState } from 'react';
import "./selection.css";
import { createBrowserRouter, RouterProvider,useNavigate } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Booking from './booking';


const Selection = () => {
  let link1 = ""
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedStation, setSelectedStation] = useState(""); 
  const [date, setDate] = useState("");
  const [station, setStation] = useState("");
  const [port, setPort] = useState("");
  const [selectedPort, setSelectedPort] = useState("")
  const handleSelectStation = (station) => {
    setSelectedStation(station); 
  };
  const handleClick = (day) => {
    setSelectedDay(day); 
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
          Please select one of the following dates to proceed with your booking
        </div>
        <div className="days">
      <div
        id="day001"
        className={`day1 day ${selectedDay === "Day 1" ? "active" : ""}`}
        onClick={() => {handleClick("Day 1")
          setDate("Day 1")
        }}
      >
        Day 1
      </div>
      <div
        id="day002"
        className={`day2 day ${selectedDay === "Day 2" ? "active" : ""}`}
        onClick={() => {handleClick("Day 2")
          setDate("Day 2")
        }}
      >
        Day 2
      </div>
      <div
        id="day003"
        className={`day3 day ${selectedDay === "Day 3" ? "active" : ""}`}
        onClick={() => {handleClick("Day 3")
          setDate("Day 3")
        }}
      >
        Day 3
      </div>
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
          onClick={() =>{ handleSelectStation("A")
            setStation("A")
          }}
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
          onClick={() =>{ handleSelectStation("B")
            setStation("B")
          }}
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
          onClick={() =>{ handleSelectStation("C")
            setStation("C")
          }}
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
        onClick={() => {handleSelectPort("001")
          setPort("001")
        }}
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
        onClick={() => {handleSelectPort("002")
          setPort("002")
        }}
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
        onClick={() => {handleSelectPort("003")
          setPort("003")
        }}
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

import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNavigation = () => {
    if (user) {
      navigate("/ev-connect/selection"); // Allow navigation if logged in
    } else {
      alert("You must be logged in to access this page!");
      navigate("/ev-connect/login"); // Redirect to login if not logged in
    }
  };



  return (
    
    <div className="cont">
  
      
      <div className="main-content">
        <div className="maintext">
        <div className="text small1">EV CONNECT</div>
        <div className="des small2">Start your journey now</div>
        <div className="getstarted">
        
        <button className='getstart' onClick={handleNavigation}>
            Get Started &gt;
          </button>
     
          
          </div>
                 
        </div>
         </div>
         <div className="part11">
          <div className="ev small">
            <span className='span1'>E-Vehicles</span>-The future of Transportation is here
          </div>
          <div className="evdesc">
          <span className="span1">Electric Vehicles</span> (EVs) are a revolutionary form of transportation powered by electricity instead of traditional fossil fuels like gasoline or diesel. These vehicles use an electric motor, drawing energy from rechargeable batteries or other energy storage systems.

EVs come in various types, including Battery Electric Vehicles BEVs, Plug-in Hybrid Electric Vehicles PHEVs, and Hybrid Electric Vehicles HEVs.
<br />
Beyond environmental benefits, EVs promise advancements in autonomous driving, connectivity, and smart transportation systems, paving the way for safer, more efficient, and tech-integrated urban mobility. With increasing investment in EV infrastructure and technology, the future of transportation is electric, promising a cleaner, more sustainable world for generations to come.
          </div>
         </div>

         <div className="pic">
          <img src="https://purepng.com/public/uploads/large/purepng.com-honda-ev-ster-electric-sports-carcarcarsvehiclevehiclestransport-561521125975zqsbj.png" alt="" />
         </div>
         <div className="part2">
          <div className="whyuse small">
            Why use <span className="span1">E-Vehicles</span>
          </div>
          <div className="whyuseanswer">
            <div className="whyuse1 hg">
              <div className="smalllogo"><i class="fa-solid fa-leaf"></i></div>
              <div className="logotext">Eco-friendly</div>
            </div>
            <div className="whyuse2 hg">
            <div className="smalllogo"><i class="fa-solid fa-dollar-sign"></i></div>
            <div className="logotext">Cheap</div>
            </div>
            <div className="whyuse3 hg">
            <div className="smalllogo"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
            <div className="logotext">High effiency</div>
            </div>
            <div className="whyuse4 hg">
            <div className="smalllogo"><i class="fa-solid fa-piggy-bank"></i></div>
            <div className="logotext">More savings</div>
            </div>
          </div>
         </div>
         <div className="part3">
          <div className="about small">About us - <span className="span1"> EV CONNECT</span></div>
          <div className="aboutdesc">
          Our EV Charging Reservation System simplifies the process of finding and reserving charging ports for electric vehicles.
          </div>
          <div className="p">
          <div className="p1">
            <div className="llog"><i class="fa-solid fa-location-dot"></i></div>
            <div className="ddesc">Locate nearby charging station</div>
          </div>
          <div className="p1">
          <div className="llog"><i class="fa-solid fa-check"></i></div>
          <div className="ddesc">Reserve a port</div>

          </div>
          <div className="p1">

          <div className="llog"><i class="fa-solid fa-chart-simple"></i></div>
          <div className="ddesc">Track charging status</div>
          </div>
          <div className="p1">
          <div className="llog"><i class="fa-regular fa-credit-card"></i></div>
          <div className="ddesc">Seamless payment</div>
          </div>
          </div>
        
         </div>

         <div className="morefunctionality">
          <div className="morefeaturesheading">
            More features
          </div>
          <div className="morefeadesc">
            <div className="more1">
            <div className="more1left">
              <div className="more1leftimg">


              </div>
              <div className="more1lefthead">
              Convience for Drivers: <span className='span1'>Reserve Your Spot Anytime, Anywhere</span> 
              </div>
              <div className="more1leftdesc">
              Using an EV reservation website offers drivers a seamless and stress-free charging experience. Instead of searching for an available charging station and risking long wait times, users can book a charging spot in advance, ensuring they have a designated space when they arrive. 
              <br />This eliminates range anxiety and helps drivers plan their trips more efficiently. The platform provides real-time availability, location details, and pricing, allowing users to choose the most convenient option. 
              </div>

            </div>
            <div className="more1right">
              <div className="more1rightimg">
             
              </div>
              <div className="more1righthead">
              Smart EV Charging: <span className='span1'>Real-Time Reservations with Advanced System</span> 
              </div>
              <div className="more1rightdesc">
              The EV reservation website is powered by advanced systems that provide real-time updates to ensure a smooth and efficient charging experience. Integrated with a dynamic backend, the platform continuously monitors charging station availability, reservation status, and user activity. <br />Live data synchronization allows instant updates on occupied and available charging spots, preventing double bookings and reducing wait times. 
              </div>
            </div>
            </div>
            <div className="more2">
            <div className="more1left">
              <div className="more1leftimg jkb">


              </div>
              <div className="more1lefthead">
              Real-Time Data Updates: <span className="span1"> Seamless EV Charging Reservations</span>
              </div>
              <div className="more1leftdesc">
              The website utilizes real-time data updates to provide users with the most accurate and up-to-date information about EV charging station availability. By integrating with a live database or API, the platform constantly checks the status of charging ports, ensuring that the availability displayed to users is current. <br /> As soon as a charging spot becomes available or occupied, the website automatically refreshes the data without requiring the user to manually reload the page. 
              </div>

            </div>
            <div className="more1right">
              <div className="more1rightimg jko">
              
              </div>
              <div className="more1righthead">
              Robust Security: <span className="span1">Protecting Your Data with Advanced Protection Features</span> 
              </div>
              <div className="more1rightdesc ">
              The EV reservation website is equipped with advanced security features to ensure the safety and privacy of user data. Using encryption protocols like SSL/TLS, all sensitive information, including payment details and personal data, is securely transmitted and protected from unauthorized access. <br /> The platform also employs multi-factor authentication (MFA) to add an extra layer of protection during login, preventing unauthorized users from accessing accounts. 
              </div>
            </div>
            </div>
          </div>
         </div>
         
    </div>
  )
}

export default Home

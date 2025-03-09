import React from 'react'
import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { NavLink } from "react-router-dom"
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from './Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogoutButton from "./LogoutButton";
const Nav = () => {


  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);







  return (
    <div>
          <div className="nav">
        <div className="logo">
          <div className="con">ev connect</div>
        <i className="fa-solid fa-bolt" id="ico"></i>
        </div>
        <div className="menu-items">
          <ul className='lis nav-links'>
            <NavLink to="/ev-connect/" end className={({ isActive }) => (isActive ? "active" : "")}><li>Home</li></NavLink>
            <NavLink to="/ev-connect/help"  className={({ isActive }) => (isActive ? "active" : "")}><li>Help</li></NavLink>
            
            
            {user ? (
        <>
          <span>Welcome, {user.email}</span>
          <LogoutButton />
        </>
      ) : (
        <>
        <NavLink to="/ev-connect/signup" className={({ isActive }) => (isActive ? "active" : "")}>Sign Up</NavLink>
      <NavLink to="/ev-connect/login" className={({ isActive }) => (isActive ? "active" : "")}><li>Log in</li></NavLink>
      </>
      )}
          
            
        
            
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Nav

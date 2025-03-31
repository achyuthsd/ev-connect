import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import LogoutButton from './LogoutButton';
import './App.css';

const Nav = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <div className="nav">
        <div className="logo">
          <div className="con">ev connect</div>
          <i className="fa-solid fa-bolt" id="ico"></i>
        </div>
        <div className="hamburger" onClick={toggleMobileMenu}>
          <i className={isMobileMenuOpen ? "fa-solid fa-times" : "fa-solid fa-bars"}></i>
        </div>
        <div className={`menu-items ${isMobileMenuOpen ? 'active' : ''}`} style={{ backgroundColor: 'rgb(22, 21, 26)', border:`none`}}>
          <ul className='lis nav-links'>
            <NavLink to="/ev-connect/" end onClick={toggleMobileMenu} className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
            <NavLink to="/ev-connect/help" onClick={toggleMobileMenu} className={({ isActive }) => (isActive ? "active" : "")} >Help</NavLink>

            {user ? (
              <>
                <span>Welcome, {user.email}</span>
                <LogoutButton />
              </>
            ) : (
              <>
                <NavLink to="/ev-connect/signup" onClick={toggleMobileMenu} className={({ isActive }) => (isActive ? "active" : "")}>Sign Up</NavLink>
                <NavLink to="/ev-connect/login"onClick={toggleMobileMenu} className={({ isActive }) => (isActive ? "active" : "")}>Log in</NavLink>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;

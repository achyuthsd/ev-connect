import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Footer from './Footer';
import Login from './Login';
import Selection from './selection';
import Booking from './booking';
import Nav from './Nav';
import Signup from './Signup';
import Home from './Home';
import Help from './Help';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/ev-connect/",
    element: <><Nav /><Home /><Footer/></>
  },
  {
    path: "/ev-connect/login",
    element: <><Nav /><Login /><Footer/></>
  },
  {
    path: "/ev-connect/selection",
    element:  <><Nav /><Selection /><Footer/></>
     
    
  },
  {
    path: "/ev-connect/booking",
    element: <><Nav /><Booking /><Footer/></>
  },
  {
    path: "/ev-connect/signup",
    element: <><Nav /><Signup /><Footer/></>
  },
  {
    path: "/ev-connect/help",
    element: <><Nav /><Help /><Footer/></>
  },
]);

function App() {
  return (
    <AuthProvider> 
    <RouterProvider router={router} />
  </AuthProvider>
  );
}

export default App;

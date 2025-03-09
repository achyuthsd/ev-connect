import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
      navigate("/ev-connect/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="logincont">
      <div className="mainlogin">
        <div className="loginleft">
          <div className="leftwrap">
            <div className="logintext">Login</div>

            {/* Email Input */}
            <div className="loginemail">
              <input
                className="emaillogin"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input with Visibility Toggle */}
            <div className="loginpassword">
              <input
                className="passlogin"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Password Visibility Checkbox */}
            <div className="password-checkbox">
              <input
                type="checkbox"
                id="show-password"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="show-password">Show Password</label>
            </div>

            <div className="forgot">Forgot password?</div>

            {/* Login Button */}
            <div className="loginbutton">
              <button className="login-button" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="loginright">
          <img
            src="vehicle-electric-charger-station-silhouette-icon-ecology-charge-for-ev-glyph-green-pictogram-electro-station-with-plug-for-ecological-car-icon-eco-friendly-charger-isolated-illustration-vector.jpg"
            alt="EV Charging Station"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

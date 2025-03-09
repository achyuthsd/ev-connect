import React, { useState } from 'react';
import './Login.css';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      navigate("/ev-connect/");
    } catch (error) {
      alert(error.message); // Show Firebase error as an alert
    }
  };

  return (
    <div>
      <div className="logincont">
        <div className="mainlogin">
          <div className="loginleft">
            <div className="leftwrap">
              <div className="logintext">Sign up</div>

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

              {/* Password Input with Toggle */}
              <div className="loginpassword">
                <input
                  className="passlogin"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Password Visibility Toggle */}
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

              {/* Sign Up Button */}
              <div className="loginbutton">
                <button className="login-button" onClick={handleSignUp}>
                  Sign up
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="loginright">
            <img
              src="/vehicle-electric-charger-station-silhouette-icon-ecology-charge-for-ev-glyph-green-pictogram-electro-station-with-plug-for-ecological-car-icon-eco-friendly-charger-isolated-illustration-vector.jpg"
              alt="EV Charger"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

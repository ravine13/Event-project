import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import '../App.css';

function SignUp({ onBackToLogin }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signUpData, setSignUpData] = useState({});

  const email_label = useRef();
  const password_label = useRef();
  const password_input = useRef();
  const confirmPasswordInput = useRef();
  const confirmPasswordLabel = useRef();

  function onInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setSignUpData((current) => ({ ...current, [name]: value }));
  }

  function onLogFormSubmit(e) {
    e.preventDefault();
    e.target.reset();

    fetch("http://127.0.0.1:5555/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          navigate("/authpage/signin");
        }
      })
      .then((data) => {
        if (data) {
          navigate("/authpage/signin");
        } else {
          navigate("/authpage/signin");
        }
      });
  }

  function onInputClick() {
    email_label.current.classList.add("active");
    password_label.current.classList.add("active");
    confirmPasswordLabel.current.classList.add("active");
  }

  function toggle_show_password() {
    setShowPassword((current) => !current);
    password_input.current.type = showPassword ? "text" : "password";
  }

  function toggleShowConfirmpassword() {
    setShowConfirmPassword((current) => !current);
    confirmPasswordInput.current.type = showConfirmPassword ? "text" : "password";
  }

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <form onSubmit={onLogFormSubmit} className="signup-form">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="first_name"
              onClick={onInputClick}
              onChange={onInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="last_name"
              onClick={onInputClick}
              onChange={onInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              onClick={onInputClick}
              onChange={onInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              ref={password_label}
              onClick={onInputClick}
              onChange={onInputChange}
              required
              className="form-input"
            />
            <button onClick={toggle_show_password} className="toggle-password-btn">
              {showPassword ? "Hide" : "Show"} Password
            </button>
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirm-password"
              ref={confirmPasswordInput}
              onClick={onInputClick}
              onChange={onInputChange}
              required
              className="form-input"
            />
            <button onClick={toggleShowConfirmpassword} className="toggle-password-btn">
              {showConfirmPassword ? "Hide" : "Show"} Password
            </button>
          </div>
          <select name="role" onChange={onInputChange} className="role-select">
            <option>What's your role</option>
            <option value={100}>Attendee</option>
            <option value={101}>Organizer</option>
            <option value={111}>Administrator</option>
          </select>
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
          <button type="button" onClick={onBackToLogin} className="back-to-login-btn">
            Back to Login
          </button>
          <Link to={"/authpage/signin"} className="login-link">
            Already have an account? Sign In
          </Link>
        </form>
      </div>
    </div>
  );
}

SignUp.propTypes = {
  onBackToLogin: PropTypes.func.isRequired,
};
export default SignUp;

import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from "prop-types";
import "../App.css"; 
import { EventsContext } from "../App";

export default function SignIn({ onSwitchToSignUp }) {
  const navigate = useNavigate();
  let { setSignedIn } = useContext(EventsContext);
  let [showPassword, setShowPassword] = useState(false);
  let [signInData, setSignInData] = useState({});
  let [recaptchaCheck, setRecaptchaCheck] = useState(false);

  let email_label = useRef();
  let password_label = useRef();
  let password_input = useRef();
  let logSubmit = useRef();

  function onRecaptchaCheck() {
    setRecaptchaCheck(current => !current)
  }

  function handleLogSubmitBtn() {
    if (!recaptchaCheck) {
      logSubmit.current.style.cssText = `transform: scale(0.9); cursor: no-drop;`;
    }
    else {
      logSubmit.current.style.cssText = `transform: scale(1.1); cursor: pointer;`;
    }
  }

  useEffect(() => {
    setTimeout(() => handleLogSubmitBtn(), 500)
  });

  function onInputClick() {
    email_label.current.style.cssText = `transform: translate(-10%, -140%) scale(0.9); background-color: rgb(20, 0, 100); color: white; border-radius: 1000px;`;
    password_label.current.style.cssText = `transform: translate(-10%, -140%) scale(0.9); background-color: rgb(20, 0, 100); color: white; border-radius: 1000px;`;
  }

  function onInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    setSignInData((current) => ({ ...current, [name]: value }));
  }

  function onLogFormSubmit(e) {
    e.preventDefault();

    fetch("http://127.0.0.1:5555/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          window.alert("No users found!");
        }
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("user_auth_token", data.token);
          if (data.role === 100) {
            navigate("/userDashboard");
          }
          else if (data.role === 101) {
            navigate("/OrganizerDashBoard");
          }
          else if (data.role === 111) {
            navigate("/admin_dashboard");
          }
          setSignedIn(true);
          console.log(data);
        }
      });
  }

  function toggle_show_password() {
    setShowPassword((current) => !current);
    if (!showPassword) {
      password_input.current.type = "text";
    } else {
      password_input.current.type = "password";
    }
  }

  return (
    <div className="signin-container">
      <div className="signin-form">
        <form onSubmit={onLogFormSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              onClick={onInputClick}
              onChange={onInputChange}
              required
              className="signin-input"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              ref={password_input}
              onClick={onInputClick}
              onChange={onInputChange}
              required
              className="signin-input"
            />
          </div>
          <ReCAPTCHA
            className='signin-recaptcha'
            sitekey="6LdeE1MpAAAAAEfpO0m3ZVvfjnAVGJU4-Nr0HpSq"
            onChange={onRecaptchaCheck}
          />
          <button
            ref={logSubmit}
            onClick={onLogFormSubmit}
            disabled={!recaptchaCheck}
            className="signin-button"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="signin-button"
          >
            Sign Up
          </button>
          <div className="signin-forgot-password">
            <NavLink className={'text-primary'} to={'/password_reset'}>
              Forgot Password?
            </NavLink>
          </div>
          <Link to="/authpage/signup" className="signin-switch-to-signup">
            Don't have an account
            <span onClick={onSwitchToSignUp}>Sign Up</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </form>
      </div>
    </div>
  );
}

SignIn.propTypes = {
  onSwitchToSignUp: PropTypes.func.isRequired,
};

import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from "prop-types";
import "../SignUp.css";
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

  function onRecaptchaCheck(){
		setRecaptchaCheck(current => !current)
	}

  function handleLogSubmitBtn(){
		if (!recaptchaCheck) {
			logSubmit.current.style.cssText = `transform: scale(0.9); cursor: no-drop;`;
		}
		else{
			logSubmit.current.style.cssText = `transform: scale(1.1); cursor: pointer;`;
		}
	}

  useEffect(() => {
		setTimeout(()=> handleLogSubmitBtn(), 500)
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
          else if (data.role === 111){
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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ flex: 1, marginTop: '3rem', maxWidth: '18rem' }}>
        <form onSubmit={onLogFormSubmit} style={{ gap: '1.25rem' }}>
          <div>
            <label style={{ fontWeight: '500' }}>Email</label>
            <input
              type="email"
              name="email"
              onClick={onInputClick}
              onChange={onInputChange}
              required
              style={{ width: '100%', marginTop: '0.5rem', paddingLeft: '0.75rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', color: '#374151', backgroundColor: 'transparent', outline: 'none', border: 'none', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', borderRadius: '0.375rem' }}
            />
          </div>
          <div>
            <label style={{ fontWeight: '500' }}>Password</label>
            <input
              type="password"
              name="password"
              ref={password_input}
              onClick={onInputClick}
              onChange={onInputChange}
              required
              style={{ width: '100%', marginTop: '0.5rem', paddingLeft: '0.75rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', color: '#374151', backgroundColor: 'transparent', outline: 'none', border: 'none', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', borderRadius: '0.375rem' }}
            />
          </div>
          <ReCAPTCHA className='recaptcha mt-4 m-2' sitekey="6LdeE1MpAAAAAEfpO0m3ZVvfjnAVGJU4-Nr0HpSq" onChange={onRecaptchaCheck}/>
          <button
            ref={logSubmit}
            onClick={onLogFormSubmit}
            disabled={!recaptchaCheck}
            style={{ width: '100%', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', color: '#F9FAFB', fontWeight: '500', backgroundColor: '#6366F1', borderRadius: '0.375rem', transition: 'all 0.15s ease-in-out' }}
          >
            Sign In
          </button>
          <button
              type="button"
              onClick={onSwitchToSignUp}
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
              Sign Up
            </button>

          <div style={{ textAlign: 'center' }}>
            <NavLink className={'text-primary'} to={'/password_reset'}>
              Forgot Password?
            </NavLink>
          </div>

          <Link
            to="/authpage/signup"
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: '#1F2937', transition: 'all 0.15s ease-in-out', fontWeight: '500' }}
          >
            Don't have an account
            <span
              style={{ color: '#6366F1', transition: 'all 0.15s ease-in-out' }}
              onClick={onSwitchToSignUp}
            >
              Sign Up
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              style={{ width: '1.25rem', height: '1.25rem', color: '#6366F1', transition: 'all 0.15s ease-in-out' }}
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
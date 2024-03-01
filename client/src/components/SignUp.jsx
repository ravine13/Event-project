import { useState, useRef } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../App.css";

function SignUp({ onBackToLogin }) {
  const navigate = useNavigate();
  let [showPassword, setShowPassword] = useState(false);
  let [showConfirmPassword, setShowConfirmPassword] = useState(false);
  let [signUpData, setSignUpData] = useState({});

  let email_label = useRef();
  let password_label = useRef();
  let password_input = useRef();
  let confirmPasswordInput = useRef();
  let confirmPasswordLabel = useRef();

  function onInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    console.log(signUpData);

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
    email_label.current.style.cssText = `transform: translate(-10%, -140%) scale(0.9); background-color: rgb(20, 0, 100); color: white; border-radius: 1000px;`;
    password_label.current.style.cssText = `transform: translate(-10%, -140%) scale(0.9); background-color: rgb(20, 0, 100); color: white; border-radius: 1000px;`;
    confirmPasswordLabel.current.style.cssText = `transform: translate(-10%, -140%) scale(0.9); background-color: rgb(20, 0, 100); color: white; border-radius: 1000px;`;
  }

  function toggle_show_password() {
    setShowPassword((current) => !current);
    if (!showPassword) {
      password_input.current.type = "text";
    } else {
      password_input.current.type = "password";
    }
  }

  function toggleShowConfirmpassword() {
    setShowConfirmPassword((current) => !current);
    if (!showConfirmPassword) {
      confirmPasswordInput.current.type = "text";
    } else {
      confirmPasswordInput.current.type = "password";
    }
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ flex: '1', marginTop: '3rem', maxWidth: '44rem' }}>
        <form onSubmit={onLogFormSubmit} style={{ marginBlock: '1.25rem' }}>
          <div>
            <label style={{ fontWeight: '500' }}>Email</label>
            <input
              type="email"
              name="email"
              onClick={onInputClick}
              onChange={onInputChange}
              required
              style={{ width: '100%', marginTop: '0.5rem', paddingLeft: '0.75rem', paddingRight: '0.75rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', color: '#111827', backgroundColor: 'transparent', outline: '2px solid transparent', outlineOffset: '2px', borderWidth: '1px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', borderRadius: '.375rem' }}
            />
          </div>
          <div>
            <label style={{ fontWeight: '500' }}>Password</label>
            <input
              type="password"
              name="password"
              ref={password_label}
              onClick={onInputClick}
              onChange={onInputChange}
              required
              style={{ width: '100%', marginTop: '0.5rem', paddingLeft: '0.75rem', paddingRight: '0.75rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', color: '#111827', backgroundColor: 'transparent', outline: '2px solid transparent', outlineOffset: '2px', borderWidth: '1px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', borderRadius: '.375rem' }}
            />
          </div>
          <div>
            <label style={{ fontWeight: '500' }}>Confirm Password</label>
            <input
              type="password"
              name="confirm-password"
              ref={confirmPasswordInput}
              onClick={onInputClick}
              onChange={onInputChange}
              required
              style={{ width: '100%', marginTop: '0.5rem', paddingLeft: '0.75rem', paddingRight: '0.75rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', color: '#111827', backgroundColor: 'transparent', outline: '2px solid transparent', outlineOffset: '2px', borderWidth: '1px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', borderRadius: '.375rem' }}
            />
          </div>
          <select
            style={{ width: '100%', fontSize: '0.875rem', paddingLeft: '0.75rem', paddingRight: '0.75rem', paddingTop: '0.625rem', paddingBottom: '0.625rem', backgroundColor: 'transparent', outline: '2px solid transparent', outlineOffset: '2px', borderWidth: '1px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', borderRadius: '.375rem', height: '100%' }}
            name="role"
            onChange={onInputChange}
          >
            <option>What's your role</option>
            <option value={100}>Attendee</option>
            <option value={101}>Organizer</option>
            <option value={111}>Administrator</option>
          </select>
          <button style={{ width: '100%', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', color: 'white', fontWeight: '500', backgroundColor: '#6366F1', borderRadius: '.375rem', transitionDuration: '150ms' }}>
            Sign Up
          </button>

          <Link
            to={"/authpage/signin"}
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: '#1F2937', transitionDuration: '150ms', fontWeight: '500' }}
          >
            Already have an account
            <span
              style={{ color: '#6366F1' }}
              onClick={onBackToLogin}
            >
              Sign In
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              style={{ width: '1.25rem', height: '1.25rem', color: '#6366F1' }}
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

SignUp.propTypes = {
  onBackToLogin: PropTypes.func.isRequired,
};
export default SignUp;
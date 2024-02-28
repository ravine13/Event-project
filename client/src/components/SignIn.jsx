import { useState, useRef, useContext } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../SignUp.css";
import { EventsContext } from "../App";

export default function SignIn({ onSwitchToSignUp }) {
  const navigate = useNavigate();
  let { setSignedIn } = useContext(EventsContext);
  let [showPassword, setShowPassword] = useState(false);
  let [signInData, setSignInData] = useState({});

  let email_label = useRef();
  let password_label = useRef();
  let password_input = useRef();
  let logSubmit = useRef();

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
          window.alert("Successfully Logged In");
          navigate("/admin_dashboard");
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
    <div className="flex items-center justify-center h-screen">
      <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
        <form onSubmit={onLogFormSubmit} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              onClick={onInputClick}
              onChange={onInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-dark bg-transparent outline-none border shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              name="password"
              ref={password_input}
              onClick={onInputClick}
              onChange={onInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-dark bg-transparent outline-none border shadow-sm rounded-lg"
            />
          </div>
          <button
            onClick={onLogFormSubmit}
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Sign In
          </button>

          <Link
            to="/authpage/signup"
            className="flex items-center gap-1 text-sm text-gray-900 duration-150 font-medium"
          >
            Don't have an account
            <span
              className="text-indigo-600 hover:text-indigo-400"
              onClick={onSwitchToSignUp}
            >
              Sign Up
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-indigo-600 hover:text-indigo-400"
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

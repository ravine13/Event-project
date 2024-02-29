import { useState, useRef, useEffect } from "react";
import {Link, NavLink }  from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from "prop-types";

export default function SignIn({ onSwitchToSignUp }) {
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef();

  function toggleShowPassword() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  useEffect(() => {
    if (showPassword) {
      passwordInputRef.current.type = "text";
    } else {
      passwordInputRef.current.type = "password";
    }
  }, [showPassword]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
        <form className="space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full mt-2 px-3 py-2 text-dark bg-transparent outline-none border shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                ref={passwordInputRef}
                required
                className="w-full mt-2 px-3 py-2 text-dark bg-transparent outline-none border shadow-sm rounded-lg"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <svg
                    className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 12a5 5 0 019.95-.1M12 6a7 7 0 00-7 7c0 1.381.4 2.66 1.1 3.74a7.95 7.95 0 001.57 1.76m3.16-1.75a7.95 7.95 0 001.76-1.76A6.978 6.978 0 0019 12a7 7 0 00-7-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.071 4.929a8 8 0 010 11.314M2.929 19.071a8 8 0 1011.314-11.314"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <ReCAPTCHA
            className="recaptcha mt-4 m-2"
            sitekey="6LdeE1MpAAAAAEfpO0m3ZVvfjnAVGJU4-Nr0HpSq"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
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

          <div className="text-center">
            <NavLink className={'text-primary'} to={'/request_password_reset'}>
              Forgot Password?
            </NavLink>
          </div>

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

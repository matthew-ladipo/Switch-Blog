import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const TestLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); // New state for email error
  const [passwordError, setPasswordError] = useState(""); // New state for password error
  const [message, setMessage] = useState("");
  const { setAuth } = useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";
  const [btn, setBtn] = useState("Login");
  const [disabledValue, setDisabledValue] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setErr("");
  }, [email, password]);

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  // Password validation function
  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and password before submitting
    validateEmail(email);
    validatePassword(password);

    if (emailError || passwordError) {
      return; // Prevent form submission if there are validation errors
    }

    setBtn("Processing...");
    setDisabledValue(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          data: { email, password },
        }
      );
      const respData = response?.data.data;
      localStorage.setItem("user", JSON.stringify(respData));
      setMessage("Login Successful");
      setAuth(respData);
      navigate(from, { replace: true });
    } catch (err) {
      const resErr = err?.response?.data;
      setErr(resErr?.message);
    } finally {
      setBtn("Login");
      setDisabledValue(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-4 py-10 lg:px-8">
      <div className="flex justify-center items-center">
        <div className="shadow-2xl rounded-lg w-full max-w-lg">
          <div className="flex rounded-xl">
            <div className="hidden md:block w-1/2 p-7 text-white bg-gray-600 rounded-l-xl">
              <p className="text-sm tracking-widest text-gray-300">
                Blog Website
              </p>
              <h1 className="text-2xl pt-5 font-medium tracking-wide leading-6">
                Switch Blog Posts
              </h1>
            </div>

            <div className="p-7 bg-white w-full rounded-r-xl">
              <h2 className="text-center text-4xl font-extrabold text-black">
                Welcome
              </h2>
              <p className="text-center text-gray-500">
                Sign in to your account
              </p>
              <form
                method="POST"
                action="#"
                className="space-y-6 pt-10"
                onSubmit={handleSubmit}
              >
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      validateEmail(e.target.value); // Validate email on change
                    }}
                    className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent placeholder-transparent focus:outline-none focus:border-blue-400"
                    required
                  />
                  <label
                    className="absolute left-0 -top-6 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-blue-500 peer-focus:text-sm"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                </div>

                <div className="relative">
                  <input
                    placeholder="Password"
                    className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent placeholder-transparent focus:outline-none focus:border-blue-400"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validatePassword(e.target.value); // Validate password on change
                    }}
                    required
                    autoComplete="current-password"
                  />
                  <label
                    className="absolute left-0 -top-6 text-gray-600 text-sm transition-all peer-focus:text-blue-500"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                </div>

                <button
                  className="w-full py-2 px-4 bg-gray-500 hover:bg-blue-300 rounded-md shadow-lg text-white font-semibold transition duration-200"
                  type="submit"
                  disabled={disabledValue}
                >
                  {btn}
                </button>
              </form>
              {message && <p className="text-center text-green-500">{message}</p>}
              {err && <p className="text-center text-red-500">{err}</p>}
              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member? <Link to="/register" className="text-blue-600">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestLogin;

import { useState } from "react";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TestLogin = () => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",

        {
          data: { name, email, password },
        }
      );
      setMessage("Registration successful!");
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        setMessage("Registration failed: " + error.response.data.message);
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        // Request was made but no response received
        setMessage("Registration failed: No response from server");
        console.error("Request data:", error.request);
      } else {
        // Something else happened while setting up the request
        setMessage("Registration failed: " + error.message);
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <div className="flex min-h-full mt-10  flex-col justify-center px-6  lg:px-8">
      <div className="flex justify-center items-center ">
        <div className="shadow-2xl rounded">
          <div className="h-full w-[700px]  flex rounded-xl">
            <div className="h-[400] w-[350px] p-7 text-white bg-gray-600 rounded-l-xl">
              <p className="text-[11px] tracking-widest text-[#cccc]">
                Blog website
              </p>
              <h1 className="text-[25px]  font-medium tracking-wide leading-[25px]">
                Switch Blog Posts
              </h1>
            </div>

            <div className=" ml-[60px] py-5  bg-white w-full rounded-r-xl relative">
              <div className="flex justify-between">
                <div className="max-w-md w-full  rounded-xl  overflow-hidden   mr-24 pr-10">
                  <h2 className="text-center text-4xl font-extrabold text-black">
                    Welcome
                  </h2>
                  <p className="text-center text-gray-500">
                    Sign in to your account
                  </p>
                  <form
                    method="POST"
                    action="#"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Username
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          type="text"
                          value={name}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          autoComplete="email"
                          className="peer h-10 w-full border-b-2 border-gray-300  bg-transparent placeholder-transparent focus:outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          autoComplete="email"
                          className="peer h-10 w-full border-b-2 border-gray-300  bg-transparent placeholder-transparent focus:outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Password:
                        </label>
                      </div>
                      <div className="mt-1">
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          autoComplete="current-password"
                          className="peer h-10 w-full border-b-2 border-gray-300  bg-transparent placeholder-transparent focus:outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>

                    <div>
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Confirm Password:
                        </label>
                      </div>
                      <div className="">
                        <input
                          id="password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          autoComplete="current-password"
                          className="peer h-10 w-full border-b-2 border-gray-300  bg-transparent placeholder-transparent focus:outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>
                    <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
                  </form>
                  {message && <p>{message}</p>}
              <p className="mt-5 text-center text-sm text-gray-500">
                Not a member? <Link to={"/"}>Login</Link>
              </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestLogin;

      
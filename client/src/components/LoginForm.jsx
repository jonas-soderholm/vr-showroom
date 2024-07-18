import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/token/`,
        {
          username,
          password,
        }
      );
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      navigate("/profile");
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Incorrect username or password.");
      } else {
        console.error("There was an error logging in!", error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen dark:bg-neutral-800">
      <div className="py-4 text-2xl font-bold text-slate-200 mt-[8rem]">
        LOG IN
      </div>
      <div className="rounded bg-white p-8 shadow-md w-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              required
            />
          </div>
          {/* <div className="text-sm mb-4">
            <span>
              <a className=" font-thin">No account? </a>
              <a href="/signup" className=" text-blue-600">
                Sign Up
              </a>
            </span>
          </div> */}

          {error && (
            <div className=" text-[0.8rem] text-red-500 text-center my-4">
              {error}
            </div>
          )}
          <div>
            <button
              type="submit"
              className="btn btn-blue px-6 py-3 mt-2 text-lg font-medium bg-blue-600 hover:bg-blue-700 rounded-md w-full"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

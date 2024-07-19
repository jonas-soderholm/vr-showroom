import { AuthContext } from "../utils/AuthContext.js";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

function MovieMain() {
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext);
  const [buttonText, setButtonText] = useState("Get Started");

  useEffect(() => {
    if (authTokens != null) {
      setButtonText("My 3D Models");
    } else {
      setButtonText("Get Started");
    }
  }, [authTokens]);

  const getStartedHandler = () => {
    if (authTokens) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="relative text-white min-h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src="./abstract2.jpg"
          alt="VR Background"
          className="hero-image w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      </div>
      <div className="relative z-10 text-center px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Upload 3D models,</h1>
        <h1 className="text-4xl font-bold mb-4">download to Multiuser-VR.</h1>
        <p className="text-lg mb-8">
          Manage your collections with speed and security.
          <br />
        </p>

        <button
          onClick={getStartedHandler}
          className="btn btn-blue px-6 py-3 text-lg font-medium rounded-md"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default MovieMain;

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
    <div className="relative bg-gray-800 text-white min-h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <img src="./quest3.jpg" alt="VR Background" className="hero-image w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Darker overlay */}
      </div>
      <div className="relative z-10 text-center px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Upload 3D models, download in VR.</h1>
        <p className="text-xl">Experience your 3D models in Virtual Reality.</p>
        <p className="text-xl mb-8">
          Upload your models, manage your collection, and enjoy a fast and simple VR experience.
        </p>
        <button
          onClick={getStartedHandler}
          className="btn btn-blue px-6 py-3 text-lg font-medium bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default MovieMain;

import { AuthContext } from "../utils/AuthContext.js";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";

function Main() {
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext);
  const [buttonText, setButtonText] = useState("Get Started");
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (authTokens) {
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

  const playVideoHandler = () => {
    setShowVideo(true);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-slate-200">
      <div className="absolute inset-0 hero-background">
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      <div className="relative z-10 text-center px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Upload 3D models,</h1>
        <h1 className="text-4xl font-bold mb-4">download in Multiuser-VR.</h1>
        <p className="text-lg mb-8">
          Manage your collections with speed and security.
          <br />
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={getStartedHandler}
            className="btn btn-blue px-6 py-3 text-lg font-medium rounded-md"
          >
            {buttonText}
          </button>
          <button
            onClick={playVideoHandler}
            className="btn px-6 py-3 text-lg font-medium rounded-md border border-white flex items-center"
          >
            <FaPlay className="mr-2" />
            Watch Video
          </button>
        </div>
        {showVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative w-full h-full max-w-4xl max-h-96">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/BU2-Aq5JT0k"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-2 right-2 text-white text-2xl"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;

import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import Upload3DModels from "./Upload3DModels";
import FetchAllModels from "./FetchAllModels";

const UserProfile = () => {
  const [models, setModels] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext); // Accessing the auth tokens from context

  useEffect(() => {
    if (!authTokens) {
      console.error("You are not logged in");
      navigate("/login");
      return; // Exit useEffect early if not authenticated
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("users/me/", {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        navigate("/login");
        console.error("You need to login", error);
      }
    };

    const fetchModels = async () => {
      try {
        const response = await axiosInstance.get("users/list-models/", {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        setModels(response.data);
      } catch (error) {
        console.error("Failed to fetch models", error);
      }
    };

    fetchUser();
    fetchModels(); // Fetch models only if authenticated
  }, [navigate, authTokens]);

  // Early return to handle unauthenticated cases
  if (!authTokens || !user) return null;

  return (
    <div className="flex flex-col min-h-screen dark:bg-neutral-800">
      <div className="text-slate-200">
        <div className="flex container px-4 py-4">
          <div className="items-center gap-4">
            <h1 className="text-xl font-bold text-slate-200">
              User: {user.username}
            </h1>
            <p className="text-sm text-slate-200">Email: {user.email}</p>
          </div>
        </div>

        <Upload3DModels />
        <div className="text-2xl text-center py-8">Your 3D-Models</div>
        <FetchAllModels models={models} />
      </div>
    </div>
  );
};

export default UserProfile;

{
  /* <button
        onClick={handleDownloadAllModels}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Download All Models
      </button> */
}

// const handleDownloadAllModels = async () => {
//   try {
//     console.log("Attempting to download models");
//     const response = await axiosInstance.get("users/download_all_models/", {
//       responseType: "blob", // Important to handle binary data
//     });

//     if (response.status === 200) {
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "models.zip"); // Name of the downloaded file
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       console.log("Models downloaded successfully");
//     } else {
//       console.error("Failed to download models, status code:", response.status);
//     }
//   } catch (error) {
//     console.error("Failed to download models", error);
//     if (error.response) {
//       console.error("Error response data:", error.response.data);
//       console.error("Error response status:", error.response.status);
//     }
//   }
// };

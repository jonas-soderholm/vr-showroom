import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Upload3DModels from "./Upload3DModels";
import FetchAllModels from "./FetchAllModels";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [models, setModels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("users/me/");
        setUser(response.data);
      } catch (error) {
        navigate("/login");
        console.error("You need to login", error);
      }
    };

    const fetchModels = async () => {
      try {
        const response = await axiosInstance.get("users/list-models/");
        setModels(response.data);
      } catch (error) {
        console.error("Failed to fetch models", error);
      }
    };

    fetchUser();
    fetchModels();
  }, [navigate]);

  if (!user) return <div></div>;

  return (
    <div className="text-slate-200">
      <div className="flex container px-4 py-4">
        <div className="flex gap-4 items-center justify-center content-center">
          <h1 className="text-3xl font-bold mb-4 text-center">Welcome, {user.username}!</h1>
          <p className="text-lg mb-4 text-center">Email: {user.email}</p>
        </div>
      </div>
      <Upload3DModels />
      <FetchAllModels />
    </div>
  );
};

export default UserProfile;

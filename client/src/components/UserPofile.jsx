import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import UploadModels from "./UploadModels";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");

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

    fetchUser();
  }, [navigate]);

  if (!user) return <div></div>;

  return (
    <>
      <div className="flex container px-4 py-4 text-slate-200">
        <div className="flex gap-4 items-center justify-center content-center">
          <h1 className="text-3xl font-bold mb-4 text-center">Welcome, {user.username}!</h1>
          <p className="text-lg mb-4 text-center">Email: {user.email}</p>
        </div>
      </div>
      <UploadModels />
      <h2 className="text-2xl font-bold mb-4 text-center pt-12 text-slate-200">Your 3D Models</h2>
    </>
  );
};

export default UserProfile;

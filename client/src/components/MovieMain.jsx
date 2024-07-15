import axiosInstance from "../utils/axiosInstance";
import { AuthContext } from "../utils/AuthContext.js";
import { useSharedState } from "../SharedContext.js";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

function MovieMain() {
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext);
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  return (
    <>
      <div className="text-2xl text-center pt-[2rem] text-slate-200">Search for any movie or series</div>
      <div className="text-2xl text-center pb-[1rem] text-slate-200">and save them to your profile</div>
      <div className="text-2xl text-center pb-[1rem] text-slate-200">and save them to your profile</div>
      <button class="btn btn-blue ">Button</button>
    </>
  );
}

export default MovieMain;

import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { FaUserCircle } from "react-icons/fa";

function Header() {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tokens, setTokens] = useState(null);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const headerClass = `dark:bg-neutral-800 text-white sticky top-0 z-50 ${
    !isHomePage ? "border-b border-opacity-50 border-slate-200" : ""
  }`;

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (accessToken && refreshToken) {
      setTokens({ access: accessToken, refresh: refreshToken });
    } else {
      setTokens(null);
    }
  }, [authTokens]);

  const logoutHandler = () => {
    logoutUser();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setTokens(null);
    navigate("/");
  };

  return (
    <header className={headerClass}>
      <div className="p-3 flex justify-between mx-1">
        <div className="flex items-center">
          <a
            href="/"
            className="md:text-2xl text-1xl text-slate-200 font-bold italic"
          >
            FastXR
          </a>
        </div>
        <div className="flex items-center md:gap-10 gap-4 md:text-sm text-xs">
          <a
            href="/"
            className="text-slate-200 flex items-center hover:underline underline-offset-4"
          >
            Home
          </a>
          <a
            href="/profile"
            className="text-slate-200 flex items-center hover:underline underline-offset-4"
          >
            <FaUserCircle className="mr-2" />
            <span>Profile</span>
          </a>
          {tokens ? (
            <>
              <a
                onClick={logoutHandler}
                className="text-slate-200 cursor-pointer hover:underline underline-offset-4"
              >
                Logout
              </a>
            </>
          ) : (
            <>
              {/* <a href="/login" className="md:text-1xl text-1xl text-slate-200">
                Login
              </a> */}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

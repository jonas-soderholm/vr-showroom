import React from "react";
import ReactDOM from "react-dom/client"; // Updated import
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Login from "./components/LoginForm";
import SignUp from "./components/SignUp";
import { SharedStateProvider } from "./SharedContext.js";
import { AuthProvider } from "./utils/AuthContext.js";
import UserProfile from "./components/UserPofile.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <SharedStateProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<UserProfile />} />
                {/* <Route path="/signup" element={<SignUp />} /> */}
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </SharedStateProvider>
    </AuthProvider>
  </React.StrictMode>
);

// Optional: Log performance metrics
reportWebVitals();

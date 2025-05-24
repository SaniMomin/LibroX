import React, { useEffect, useState } from "react";
import Navbar1 from "./Navbar1";
import { Link, Outlet } from "react-router-dom";
import "../UserSide_CSS(Files)/UserDashBoard.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const UsersDashboard = () => {
  const [isLogin, SetIsLogin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Optionally check against localStorage too
        const uidFromLocal = localStorage.getItem("id");
        if (uidFromLocal && uidFromLocal === user.uid) {
          SetIsLogin(true);
        } else {
          SetIsLogin(false);
        }
      } else {
        SetIsLogin(false);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <div>
      {isLogin ? (
        <div>
          <div style={{ height: "30px" }}>
            <Navbar1 />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="SessionError-wrapper">
          <div className="SessionError-box">
            <h1 style={{color:'#d2ad86'}}>Access Denied</h1>
            <p style={{color:'#d2ad86'}}>Your session has expired or your access is invalid.</p>
            <Link to="/loginUR" className="SessionError-btn">
             Go to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersDashboard;

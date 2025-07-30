import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../FireBase";
import "../UserSide_CSS(Files)/LoginUR.css";
import toast, { Toaster } from "react-hot-toast";

const LoginUR = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const checkAd = async (event) => {
    event.preventDefault();

    setIsUploading(true); // disable button

    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        localStorage.setItem("id", res.user.uid);
        setIsUploading(false); // enable button
        setTimeout(() => {
          navigate("/userDashboard/homeUR");
        }, 1500);
      })
      .catch((e) => {
        if (e.code === "auth/invalid-credential")
          toast.error("Wrong Email or Password.");
        else toast.error(e.message || "An Error Occured.");
        
        setIsUploading(false); // enable button
      });
  };

  return (
    <div className="LoginUR-wrapper">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            backgroundColor: "#5a432e", // A warm brown that matches your theme
            color: "#fefae0", // Soft ivory/yellowish text
            fontSize: "16px",
            border: "1px solid #d1b18d", // Tie it in with the beige
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          },
        }}
      />
      <div className="LoginUR-formContainer">
        <form className="LoginUR-form" onSubmit={checkAd}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="LoginUR-linkContainer">
            <Link to="/signupUR" className="LoginUR-link">
              Register
            </Link>
            <Link to="/passwordChange" className="LoginUR-link">
              Forgot Password
            </Link>
          </div>

          <button type="submit" disabled={isUploading}>
            {isUploading ? "Loggging..." : "Login"}
          </button>
        </form>
        <div className="LoginUR-image">
          <img src="/images/loginUR_image.jpg" alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default LoginUR;

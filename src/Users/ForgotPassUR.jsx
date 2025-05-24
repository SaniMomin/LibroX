import React, { useState } from "react";
import { auth } from "../FireBase";
import { sendPasswordResetEmail } from "firebase/auth";
import "../UserSide_CSS(Files)/ForgotPassUR.css";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassUR = () => {
  const [email, setEmail] = useState("");

  const changePass = async (e) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password Reset email send!");
      })
      .catch((e) => {
        toast.error(e.message || "Something went wrong!");
      });
  };

  return (
    <div className="ForgotPassUR-wrapper">
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
      <div className="ForgotPassUR-formContainer">
        <h1>Forgot Password</h1>
        <form onSubmit={changePass} className="ForgotPassUR-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Confirm</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassUR;

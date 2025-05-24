import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { firebase_librox } from "../FireBase";
import "../AdminSide_CSS(File)/LoginAD.css";

const LoginAD = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch_emailpass();
  });

  const fetch_emailpass = async () => {
    try {
      const refColl = collection(firebase_librox, "Admin");
      const refDocs = await getDocs(refColl);
      const data = refDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAdmin(data[0]);
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (email === admin.email && password === admin.password) {
      navigate("/adminDashboard/homeAD");
    } else {
      toast("Wrong Email or Password Check!");
    }
  };

  return (
    <div className="LoginAD-wrapper">
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
      {admin ? (
        <div className="LoginAD-formContainer">
          <form onSubmit={handleLogin} className="LoginAD-form">
            <h1>Admin Login</h1>
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
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default LoginAD;

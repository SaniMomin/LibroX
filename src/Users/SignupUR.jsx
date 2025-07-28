import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, firebase_librox } from "../FireBase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import "../UserSide_CSS(Files)/SignupUR.css";
import toast, { Toaster } from "react-hot-toast";
import { client } from "filestack-react";

const SignupUR = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [photoFile, setPhotoFile] = useState("");

  const savedData = async (event) => {
    event.preventDefault();
    try {
      toast("Your Account is creating...", {
        duration: 3000,
      });
      const userAuth = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const fileStack = client.init(process.env.REACT_APP_FILESTACK_API_KEY);
      const filePhoto = await fileStack.upload(photoFile);
      await addDoc(collection(firebase_librox, "Users"), {
        UID: userAuth.user.uid,
        Email: email,
        Name: name,
        DOB: dob,
        Gender: gender,
        Phone: phone,
        Address: address,
        Photo_url: filePhoto.url,
        Like: [],
        Wishlist: [],
        Subscription: false,
        Subscription_expire: null,
      });
      toast.success("Account Created!");
      setTimeout(() => {
        navigate("/loginUR");
      }, 1500);
    } catch (e) {
      if (e.code === "auth/email-already-in-use")
        toast.error("This email is already registered. Please log in instead.");
      else toast.error(e.message || "An error occurred");
    }
  };

  return (
    <div className="SignupUR-wrapper">
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
      <div className="SignupUR-formContainer">
        <h1>Signup</h1>
        <form className="SignupUR-form" onSubmit={savedData}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="date">Date of Birth</label>
          <input
            type="date"
            onChange={(e) => setDOB(e.target.value)}
            required
          />

          <label htmlFor="gender">Gender</label>
          <select onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Please give correct address is will used in Delivery"
            required
          />

          <label htmlFor="photo">Upload Your Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhotoFile(e.target.files[0])}
            required
          />
          <button type="submit">Create Account</button>
        </form>
        <div className="SignupUR-LinksContainer">
          <Link to="/loginUR" className="SignupUR-Links">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupUR;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, firebase_librox } from "../FireBase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import "../UserSide_CSS(Files)/SignupUR.css";
import toast, { Toaster } from "react-hot-toast";

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

  const [isUploading, setIsUploading] = useState(false);

  const savedData = async (event) => {
    event.preventDefault();
    try {
      setIsUploading(true); // disable button

      const userAuth = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const data = new FormData();
      data.append("file", photoFile);
      data.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const uploadedImageURL = await res.json();

      if (!uploadedImageURL.secure_url) {
        toast.error("Error Photo is not upload try again after some time.");
        setIsUploading(false); // enable button
        return;
      }

      await addDoc(collection(firebase_librox, "Users"), {
        UID: userAuth.user.uid,
        Email: email,
        Name: name,
        DOB: dob,
        Gender: gender,
        Phone: phone,
        Address: address,
        Photo_url: uploadedImageURL.secure_url,
        Like: [],
        Wishlist: [],
        Subscription: false,
        Subscription_expire: null,
      });
      toast.success("Account Created!");

      setIsUploading(false); // enable button

      setTimeout(() => {
        navigate("/loginUR");
      }, 1500);
    } catch (e) {
      if (e.code === "auth/email-already-in-use")
        toast.error("This email is already registered. Please log in instead.");
      else toast.error(e.message || "An error occurred");

      setIsUploading(false); // enable button
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
            type="tel"
            pattern="[0-9]{10}"
            maxLength={10}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter 10-digit phone number"
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
          <button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Change"}
          </button>
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

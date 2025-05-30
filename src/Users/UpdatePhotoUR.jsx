import { client } from "filestack-react";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { firebase_librox } from "../FireBase";
import "../UserSide_CSS(Files)/UpdatePhotoUR.css";
import toast, { Toaster } from "react-hot-toast";

const UpdatePhotoUR = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [docID, setDocID] = useState(location.state);
  const [photoFile, setPhotoFile] = useState("");
  
  const updateImg = async (event) => {
    event.preventDefault();
    try {
      toast("Photo is Changing...");

      const fileStack = client.init("ATuYVTP9T1a7cWnFl3uUAz");
      const filePhoto = await fileStack.upload(photoFile);

      const refDoc = doc(firebase_librox, "Users", docID);
      await updateDoc(refDoc, {
        Photo_url: filePhoto.url,
      });
      toast.success("Profile Photo Changed!");
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (e) {
      toast.error(e.message || "SomeThing Went Wrong!");
    }
  };
  
  return (
    <div className="UpdatePhotoUR-wrapper">
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
      <div className="UpdatePhotoUR-formContainer">
        <h1>Change Profile Photo for your LibroX Account</h1>
        <form onSubmit={updateImg} className="UpdatePhotoUR-form">
          <label htmlFor="photo">New Photo</label>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => setPhotoFile(e.target.files[0])}
            required
          />
          <button type="submit">Confirm</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePhotoUR;

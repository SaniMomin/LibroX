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
  const [isUploading, setIsUploading] = useState(false);

  const updateImg = async (event) => {
    event.preventDefault();
    try {
      setIsUploading(true); // disable button

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
        toast.error("Error Photo is not changing try again after some time.");
        setIsUploading(false); // enable button
        return;
      }

      const refDoc = doc(firebase_librox, "Users", docID);
      await updateDoc(refDoc, {
        Photo_url: uploadedImageURL.secure_url,
      });

      toast.success("Profile Photo Changed!");
      setIsUploading(false); // enable button

      setTimeout(() => {
        navigate(-1);
      }, 2000);

    } catch (e) {
      toast.error(e.message || "SomeThing Went Wrong!");
      setIsUploading(false); // enable button
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
          <button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Change"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePhotoUR;

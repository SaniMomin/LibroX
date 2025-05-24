import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { firebase_librox } from "../FireBase";
import { doc, updateDoc } from "firebase/firestore";
import "../UserSide_CSS(Files)/UpdateProfileUR.css";

const UpdateProfileUR = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(location.state);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      toast("Data is Updating...");
      const refDoc = doc(firebase_librox, "Users", userDetails.id);
      await updateDoc(refDoc, userDetails);
      toast.success("Data is Updated!");
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };
  
  return (
    <div className="UpdateProfileUR-wrapper">
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
      <div className="UpdateProfileUR-formContainer">
        <h1>Update Profile</h1>
        <form onSubmit={handleUpdate} className="UpdateProfile-form">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            onChange={(e) =>
              setUserDetails({ ...userDetails, Name: e.target.value })
            }
            placeholder={userDetails.Name}
          />
          <label htmlFor="date">Date of Birth : {userDetails.DOB}</label>
          <input
            type="date"
            onChange={(e) =>
              setUserDetails({ ...userDetails, DOB: e.target.value })
            }
          />
          <label htmlFor="gender">Gender : {userDetails.Gender}</label>
          <select
            onChange={(e) =>
              setUserDetails({ ...userDetails, Gender: e.target.value })
            }
          >
            <option>Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <label htmlFor="name">Phone</label>
          <input
            type="number"
            onChange={(e) =>
              setUserDetails({ ...userDetails, Phone: e.target.value })
            }
            placeholder={userDetails.Phone}
          />
          <label htmlFor="name">Address</label>
          <input
            type="text"
            onChange={(e) =>
              setUserDetails({ ...userDetails, Address: e.target.value })
            }
            placeholder={userDetails.Address}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileUR;

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import "../AdminSide_CSS(File)/UpdateAdvertiseAD.css";
import { doc, updateDoc } from "firebase/firestore";
import { firebase_librox } from "../FireBase";

const UpdateAdvertiseAD = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [adsDetails, setAdsDetails] = useState(location.state);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      setIsUploading(true); // disable button

      const refDoc = doc(firebase_librox, "AllAdvertise", adsDetails.id);
      await updateDoc(refDoc, adsDetails);

      toast.success("Data is Updated!");
      setIsUploading(false); // enable button

      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
      setIsUploading(false); // enable button
    }
  };

  return (
    <div className="UpdateAdvertiseAD-wrapper">
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
      <div className="UpdateAdvertiseAD-formContainer">
        <h1>Update Advertise</h1>
        <form onSubmit={handleUpdate} className="UpdateAdvertiseAD-form">
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            onChange={(e) =>
              setAdsDetails({ ...adsDetails, Title: e.target.value })
            }
            placeholder={adsDetails.Title}
          />
          <label htmlFor="TargetUrl">TargetUrl</label>
          <input
            type="text"
            onChange={(e) =>
              setAdsDetails({ ...adsDetails, TargetUrl: e.target.value })
            }
            placeholder={adsDetails.TargetUrl}
          />
          <label htmlFor="Description">Description</label>
          <input
            type="text"
            onChange={(e) =>
              setAdsDetails({ ...adsDetails, Description: e.target.value })
            }
            placeholder={adsDetails.Description}
          />
          <label htmlFor="AdvertiserName">AdvertiserName</label>
          <input
            type="text"
            onChange={(e) =>
              setAdsDetails({ ...adsDetails, AdvertiserName: e.target.value })
            }
            placeholder={adsDetails.AdvertiserName}
          />
          <label htmlFor="AdvertiserContact">AdvertiserContact</label>
          <input
            type="number"
            onChange={(e) =>
              setAdsDetails({
                ...adsDetails,
                AdvertiserContact: e.target.value,
              })
            }
            placeholder={adsDetails.AdvertiserContact}
          />
          <label htmlFor="PricePaid">PricePaid</label>
          <input
            type="number"
            onChange={(e) =>
              setAdsDetails({
                ...adsDetails,
                PricePaid: Number(e.target.value),
              })
            }
            placeholder={adsDetails.PricePaid}
          />
          <label htmlFor="StartDate">StartDate : {adsDetails.StartDate}</label>
          <input
            type="date"
            onChange={(e) =>
              setAdsDetails({ ...adsDetails, StartDate: e.target.value })
            }
          />
          <label htmlFor="EndDate">EndDate : {adsDetails.EndDate}</label>
          <input
            type="date"
            onChange={(e) =>
              setAdsDetails({ ...adsDetails, EndDate: e.target.value })
            }
          />

          <button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Change"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAdvertiseAD;

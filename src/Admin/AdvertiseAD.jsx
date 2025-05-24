import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firebase_librox } from "../FireBase";
import toast, { Toaster } from "react-hot-toast";
import "../AdminSide_CSS(File)/AdvertiseAD.css";
import { useNavigate } from "react-router-dom";

const AdvertiseAD = () => {
  const naviagte = useNavigate();
  const [advertiseList, setAdvertiseList] = useState([]);

  useEffect(() => {
    fetch_AD();
  });

  const fetch_AD = async () => {
    try {
      const refColl = collection(firebase_librox, "AllAdvertise");
      const refDocs = await getDocs(refColl);
      const data = refDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAdvertiseList(data);
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  const handleAdd = () => {
    naviagte("/adminDashboard/addAdvertiseAD");
  };

  const handleUpdate = (adv) => {
    naviagte("/adminDashboard/updateAdvertiseAD", { state: adv });
  };

  const handleRemove = async (adsid) => {
    try {
      const refDoc = doc(firebase_librox, "AllAdvertise", adsid);
      await deleteDoc(refDoc);
      toast.success("Removed from Advertisement List!");

      fetch_AD();
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  return (
    <div className="AdvertiseAD-wrapper">
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
      <div className="AdvertiseAD-AddAdvertice">
        <button onClick={() => handleAdd()}>ADD ADVERTISE</button>
      </div>
      {advertiseList.length > 0 ? (
        <div className="AdvertiseAD-ADlistContainer">
          {advertiseList.map((adver) => (
            <div key={adver.id} className="AdvertiseAD-Advertise">
              <div className="AdvertiseAD-IMG">
                <img src={adver.ImageURL} alt="Error" />
              </div>
              <div className="AdvertiseAD-Info">
                <p>Title:{adver.Title}</p>
                <p>targetUrl:{adver.TargetUrl}</p>
                <p>description:{adver.Description}</p>
                <p>advertiserName:{adver.AdvertiserName}</p>
                <p>advertiserContact:{adver.AdvertiserContact}</p>
                <p>pricePaid:{adver.PricePaid}</p>
                <p>startDate:{adver.StartDate}</p>
                <p>endDate:{adver.EndDate}</p>
                <button onClick={() => handleUpdate(adver)}>Update</button>
                <button onClick={() => handleRemove(adver.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default AdvertiseAD;

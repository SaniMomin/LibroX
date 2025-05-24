import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firebase_librox } from "../FireBase";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import "../UserSide_CSS(Files)/AdvertiseUR.css";

const AdvertiseUR = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookID, setBookID] = useState(location.state);
  const [advertise, setAdvertise] = useState();
  const [showButton, setButton] = useState(false);

  useEffect(() => {
    fetch_Ads();
  }, []);

  const fetch_Ads = async () => {
    try {
      const refColl = collection(firebase_librox, "AllAdvertise");
      const refDocs = await getDocs(refColl);
      const data = refDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (data.length > 0) {
        const randomAds = data[Math.floor(Math.random() * data.length)];
        setAdvertise(randomAds);
        buttonShow();
      } else {
        navigate(`/userDashboard/bookDetailsUR/${bookID}`);
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  const buttonShow = () => {
    setTimeout(() => {
      setButton(true);
    }, 15000);
  };

  const handleButton = () => {
    navigate(`/userDashboard/bookDetailsUR/${bookID}`);
  };

  return (
    <div className="AdvertiseUR-wrapper">
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
      {advertise ? (
        <div className="AdvertiseUR-AdvertiseContainer">
          <h1>Advertise</h1>
          <div className="AdvertiseUR-IMG">
            <img src={advertise.ImageURL} alt="Error" />
          </div>
          <div className="AdvertiseUR-Details">
            <h3>{advertise.Title}</h3>
            <p>{advertise.Description}</p>
            <a
              href={advertise.TargetUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
            </a>
          </div>
          {showButton && (
            <button onClick={() => handleButton()}>
              <img src="/images/exit.png" alt="About" />
            </button>
          )}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default AdvertiseUR;

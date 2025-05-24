import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firebase_librox } from "../FireBase";
import "../UserSide_CSS(Files)/SubscriptionListUR.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const SubscriptionListUR = () => {
  const navigate = useNavigate();
  const [subList, setSubList] = useState([]);
  
  useEffect(() => {
    fetch_Sub();
  });
  
  const fetch_Sub = async () => {
    try {
      const refQuery = query(
        collection(firebase_librox, "Subscription"),
        orderBy("SubNumber", "asc")
      );
      const refDocs = await getDocs(refQuery);
      const data = refDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubList(data);
    } catch (e) {
      toast.error(e.message||"Something went wrong");
    }
  };

  const handleSubscription = (subDet) => {
    navigate("/userDashboard/subPaymentUR", { state: subDet });
  };

  return (
    <div className="SubscriptionUR-wrapper">
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
      <h1>Subscription List</h1>
      {subList.length > 0 ? (
        <div className="SubscriptionUR-subscriptionList">
          {subList.map((sub) => (
            <div className="SubscriptonUR-subscription">
              <p>Validity : {sub.Validity} days</p>
              <p>Price : {sub.Price} </p>
              <button onClick={() => handleSubscription(sub)}>
                Buy Subscription
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default SubscriptionListUR;

import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { firebase_librox } from "../FireBase";
import toast, { Toaster } from "react-hot-toast";
import "../UserSide_CSS(Files)/SubPaymentUR.css";

const SubPaymentUR = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [subDetails, setSubDetails] = useState(location.state);
  const [userDetails, setUserDetails] = useState();
  
  useEffect(() => {
    fetch_userData();
  }, []);

  const fetch_userData = async () => {
    try {
      const refQuery = query(
        collection(firebase_librox, "Users"),
        where("UID", "==", localStorage.getItem("id"))
      );
      const refDocs = await getDocs(refQuery);
      const data = refDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserDetails(data[0]);
    } catch (e) {
      toast.error(e.message || "Some thing went wrong!");
    }
  };

  const setPremium = async (event) => {
    event.preventDefault();
    try {
      const ans = window.confirm("Are you sure,you want to Buy Subscription!");
      if (ans === true) {
        if (userDetails.Subscription === true) {
          toast("Already have Subscription!");
        } else {
          const refDoc = doc(firebase_librox, "Users", userDetails.id);
          await updateDoc(refDoc, {
            Subscription: true,
            Subscription_expire: Date.now() + subDetails.time,
          });
          toast.success("Premium Buy Successfully!");

          setTimeout(() => {
            navigate(-2);
          }, 2000);
        }
      } else {
        setTimeout(() => {
          navigate(-2);
        }, 1500);
      }
    } catch (e) {
      toast.error(e.message || "Some thing went wrong!");
    }
  };

  return (
    <div className="SubPaymentUR-wrapper">
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
      <div className="SubPayment-formContainer">
        <h1>Make Payment to LibroX</h1>
        <form onSubmit={setPremium} className="SubPayment-form">
          <label htmlFor="A/C no">A/C no.</label>
          <input type="number" required />
          <label htmlFor="Password">Password</label>
          <input type="password" required />
          <label htmlFor="Validity">Validity</label>
          <input type="number" value={subDetails.Validity} />
          <label htmlFor="Price">Price</label>
          <input type="number" value={subDetails.Price} />
          <button type="submit">Pay</button>
        </form>
      </div>
    </div>
  );
};

export default SubPaymentUR;

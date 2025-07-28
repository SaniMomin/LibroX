import React, { useEffect, useState } from "react";
import "../UserSide_CSS(Files)/ReportEmail.css";
import { collection, where, query, getDocs } from "firebase/firestore";
import { firebase_librox } from "../FireBase";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";

const ReportEmail = () => {
  const [userDetails, setUserDetails] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch_userDetails();
  }, []);

  const fetch_userDetails = async () => {
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
      toast.error(e.message || "Something went wrong!");
    }
  };

  const handleReport = (event) => {
    event.preventDefault();

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICEID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATEID;
    const publicId = process.env.REACT_APP_EMAILJS_PUBLICID;

    const templateParam = {
      user_name: userDetails.Name,
      user_email: userDetails.Email,
      to_name: "LibroX Customer Support",
      message: message,
    };

    emailjs
      .send(serviceId, templateId, templateParam, publicId)
      .then((response) => {
        toast.success("Report Email send to LibroX Customer Support.");
      })
      .catch((e) => {
        toast.error("Error sending Email", e);
      });
  };

  return (
    <div className="ReportEmail-wrapper">
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
      {userDetails ? (
        <div className="ReportEmail-formContainer">
          <form onSubmit={handleReport} className="ReportEmail-form">
            <label htmlFor="name">Your Name</label>
            <input type="text" value={userDetails.Name} />
            <label htmlFor="name">Your Email</label>
            <input type="email" value={userDetails.Email} />
            <label htmlFor="Message">Message</label>
            <textarea
              rows={7}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button type="submit">Report</button>
          </form>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default ReportEmail;

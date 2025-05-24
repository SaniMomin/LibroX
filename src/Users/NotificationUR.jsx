import { collection, deleteDoc, doc, getDocs } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { firebase_librox } from "../FireBase";
import "../UserSide_CSS(Files)/NotificationUR.css";
import toast, { Toaster } from "react-hot-toast";

const NotificationUR = () => {
  const [loading, setLoading] = useState(true);
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    filter_Notification();
  }, []);

  const filter_Notification = async () => {
    try {
      const refColl = collection(firebase_librox, "Notification");
      const refDocs = await getDocs(refColl);
      const data = refDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      data.forEach(async (noti) => {
        const currentdate = Date.now();

        if (currentdate > noti.expire_time) {
          const refDoc = doc(firebase_librox, "Notification", noti.id);
          await deleteDoc(refDoc);
        }
      });
      fetch_Notification();
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  const fetch_Notification = async () => {
    try {
      const refColl = collection(firebase_librox, "Notification");
      const refDocs = await getDocs(refColl);
      const data = refDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (data.length > 0) {
        setNotificationList(data);
      } else {
        setLoading(false);
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  return (
    <div className="NotificationUR-wrapper">
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
      <h1>Notification Alert</h1>
      {notificationList.length > 0 ? (
        <div className="NotificationUR-notificationList">
          {notificationList.map((noti) => (
            <div key={noti.id} className="NotificationUR-notification">
              <p>{noti.message}</p>
            </div>
          ))}
        </div>
      ) : (
        <h1>{loading === true ? "Loading..." : "No Notification"}</h1>
      )}
    </div>
  );
};

export default NotificationUR;

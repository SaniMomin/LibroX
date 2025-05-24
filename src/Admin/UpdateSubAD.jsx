import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firebase_librox } from "../FireBase";
import toast, { Toaster } from "react-hot-toast";
import "../AdminSide_CSS(File)/UpdateSubAD.css";

const UpdateSubAD = () => {
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [subNo, setSubNo] = useState("");
  const [newPrice, setNewPrice] = useState("");

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
      setSubscriptionList(data);
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const arr1 = subscriptionList.map(async (sub) => {
        if (sub.SubNumber === subNo) {
          const refDoc = doc(firebase_librox, "Subscription", sub.id);
          await updateDoc(refDoc, {
            Price: newPrice,
          });
          sub.Price = newPrice;
          return sub;
        } else {
          return sub;
        }
      });
      setSubscriptionList(arr1);

      await addDoc(collection(firebase_librox, "Notification"), {
        message: `Subscription No.${subNo} Price is updated by LibroX at time ${new Date().toLocaleString()}.`,
        expire_time: Date.now() + 7 * 24 * 60 * 60 * 1000,
      });
      toast.success("Price updated Successfully!");
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  return (
    <div className="UpdateSubAD-wrapper">
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
      {subscriptionList.length > 0 ? (
        <div className="UpdateSubAD-subscriptionList">
          {subscriptionList.map((sub) => (
            <div className="UpdateSubAD-subscription">
              <p>Subscription no. : {sub.SubNumber}</p>
              <p>Validity : {sub.Validity} days</p>
              <p>Price : {sub.Price}</p>
            </div>
          ))}
          <h2>Update Subscription Price:</h2>
          <form onSubmit={handleUpdate} className="UpdateSubAD-updateContainer">
            <select onChange={(e) => setSubNo(Number(e.target.value))} required>
              <option value="">Select</option>
              <option value="1">Subscription no.1</option>
              <option value="2">Subscription no.2</option>
              <option value="3">Subscription no.3</option>
              <option value="4">Subscription no.4</option>
              <option value="5">Subscription no.5</option>
            </select>
            <input
              type="number"
              onChange={(e) => setNewPrice(Number(e.target.value))}
              placeholder="New Price"
              required
            />
            <button type="submit">Set Price</button>
          </form>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};
export default UpdateSubAD;

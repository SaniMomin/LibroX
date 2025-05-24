import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { firebase_librox } from "../FireBase";
import "../AdminSide_CSS(File)/OrderListAD.css";
import toast, { Toaster } from "react-hot-toast";

const OrderListAD = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    fetch_orders();
  });

  const fetch_orders = async () => {
    try {
      const refQuery = query(
        collection(firebase_librox, "Orders"),
        orderBy("order_date", "desc")
      );
      const refDocs = await getDocs(refQuery);
      const data = refDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrderList(data);
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  const handleDel = async (orderid, orderCon) => {
    try {
      if (orderCon === "Confirmed") {
        toast("Order Already Confirmed!");
      } else {
        const refDoc = doc(firebase_librox, "Orders", orderid);
        await updateDoc(refDoc, {
          delivered: "Confirmed",
        });
        toast.success("Order Confirmed!");
        fetch_orders();
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  return (
    <div className="OrderDetAD-wrapper">
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
      <h1>All Order Detailes</h1>
      {orderList.length > 0 ? (
        <div className="OrderDetAD-orderlistContainer">
          {orderList.map((order) => (
            <div key={order.id} className="OrderDetAD-order">
              <p>Username: {order.username}</p>
              <p>Contact: {order.contact}</p>
              <p>Address: {order.address}</p>
              <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
              <p>Book: {order.book}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Total: {order.total}</p>
              <p>Delivered: {order.delivered}</p>
              <button onClick={() => handleDel(order.id, order.delivered)}>
                Confirm Order
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

export default OrderListAD;

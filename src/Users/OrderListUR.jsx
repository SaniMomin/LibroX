import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firebase_librox } from "../FireBase";
import "../UserSide_CSS(Files)/OrderListUR.css";
import toast, { Toaster } from "react-hot-toast";

const OrderListUR = () => {
  const [loading, setLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);
  
  useEffect(() => {
    fetch_Order();
  });

  const fetch_Order = async () => {
    try {
      const refQuery = query(
        collection(firebase_librox, "Orders"),
        where("user_id", "==", localStorage.getItem("id"))
      );
      const refDocs = await getDocs(refQuery);
      const data = refDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (data.length > 0) {
        setOrderList(data);
      } else {
        setLoading(false);
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };
  
  return (
    <div className="OrderListUR-wrapper">
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
      <h1>Your Orders</h1>
      {orderList.length > 0 ? (
        <div className="OrderListUR-OrdersList">
          {orderList.map((order) => (
            <div key={order.id} className="OrderListUR-Order">
              <p>Name : {order.book}</p>
              <p>Quantity : {order.quantity}</p>
              <p>Total : {order.total}</p>
              <p>Address : {order.address}</p>
              <p>Contact : {order.contact}</p>
              <p>
                Order Date: {new Date(order.order_date).toLocaleDateString()}
              </p>
              <p>
                Delivery:{" "}
                <strong
                  style={
                    order.delivered === "not Confirm" ? { color: "red" } : {}
                  }
                >
                  {order.delivered}
                </strong>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <h1>{loading === true ? "Loading..." : "No Order Yet"}</h1>
      )}
    </div>
  );
};

export default OrderListUR;

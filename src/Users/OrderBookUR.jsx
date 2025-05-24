import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { firebase_librox } from "../FireBase";
import toast, { Toaster } from "react-hot-toast";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import "../UserSide_CSS(Files)/OrderBookUR.css";

const OrderBookUR = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userDet, bookDet } = location.state;
  const [totalPrice, settotalPrice] = useState(0);
  const [quantity, setQuantity] = useState();

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      const ans=window.confirm("Are you sure,you want to place order!");
      if(ans===true){
      const refDoc = doc(firebase_librox, "Books", bookDet.id);
      await updateDoc(refDoc, {
        Remaining: bookDet.Remaining - quantity,
        Sold: bookDet.Sold + quantity,
      });

      await addDoc(collection(firebase_librox, "Orders"), {
        user_id: userDet.UID,
        username: userDet.Name,
        contact: userDet.Phone,
        address: userDet.Address,
        book: bookDet.Name,
        quantity: quantity,
        total: totalPrice,
        delivered: "not Confirm",
        order_date: Date.now(),
      });
      toast.success("Order Placed!");

      setTimeout(() => {
        navigate(-1);
      }, 1500);
    }else{
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    }
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  return (
    <div className="OrderBookUR-wrapper">
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
      <div className="OrderBookUR-formContainer">
        <h1>Order Payment</h1>
        <form onSubmit={handleOrder} className="OrderBookUR-form">
          <label htmlFor="account">A/C</label>
          <input type="number" id="account" required />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            value={quantity} // Controlled input to sync with React state
            min="1" // Prevents negative or zero values
            max={bookDet.Remaining} // Prevents exceeding available stock
            onChange={(e) => {
              const newQuantity = Number(e.target.value); // Convert input to number
              setQuantity(newQuantity); // Update React state

              if (newQuantity > Number(bookDet.Remaining)) {
                settotalPrice(0);
                toast.error(`We only have ${bookDet.Remaining} in stock.`);
              } else {
                settotalPrice(bookDet.Price * newQuantity);
              }
            }}
            required
          />
          <label htmlFor="totalPrice">Total Price</label>
          <input type="number" value={totalPrice} readOnly />
          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
};

export default OrderBookUR;

import { client } from "filestack-react";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { firebase_librox } from "../FireBase";
import "../AdminSide_CSS(File)/AddAdvertiseAD.css";
import { useNavigate } from "react-router-dom";

const AddAdvertiseAD = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [description, setDescription] = useState("");
  const [advertiserName, setAdvertiserName] = useState("");
  const [advertiserContact, setAdvertiserContact] = useState("");
  const [pricePaid, setPricePaid] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const addAdvertise = async (event) => {
    event.preventDefault();
    try {
      toast("Advertise is Adding...", {
        duration: 3000,
      });

      const fileStack = client.init("ATuYVTP9T1a7cWnFl3uUAz");
      const filePhoto = await fileStack.upload(image);
      await addDoc(collection(firebase_librox, "AllAdvertise"), {
        ImageURL: filePhoto.url,
        Title: title,
        TargetUrl: targetUrl,
        Description: description,
        AdvertiserName: advertiserName,
        AdvertiserContact: advertiserContact,
        PricePaid: pricePaid,
        StartDate: startDate,
        EndDate: endDate,
      });
      toast.success("Adveritse is Added!");

      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  return (
    <div className="AddAdvertiseAD-wrapper">
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
      <div className="AddAdvertiseAD-formContainer">
        <h1>Add Advertise</h1>
        <form onSubmit={addAdvertise} className="AddAdvertiseAD-form">
          <label htmlFor="Image">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <label htmlFor="Title">Title</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="TargetUrl">TargetUrl</label>
          <input
            type="text"
            onChange={(e) => setTargetUrl(e.target.value)}
            required
          />

          <label htmlFor="Description">Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={7}
          />

          <label htmlFor="AdvertiserName">AdvertiserName</label>
          <input
            type="text"
            onChange={(e) => setAdvertiserName(e.target.value)}
            required
          />

          <label htmlFor="AdvertiserContact">AdvertiserContact</label>
          <input
            type="number"
            onChange={(e) => setAdvertiserContact(e.target.value)}
            required
          />

          <label htmlFor="PricePaid">PricePaid</label>
          <input
            type="number"
            onChange={(e) => setPricePaid(Number(e.target.value))}
            required
          />

          <label htmlFor="StartDate">StartDate</label>
          <input
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
            required
          />

          <label htmlFor="EndDate">EndDate</label>
          <input
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <button type="submit">ADD ADVERTISE</button>
        </form>
      </div>
    </div>
  );
};

export default AddAdvertiseAD;

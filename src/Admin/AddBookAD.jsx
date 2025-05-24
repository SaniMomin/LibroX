import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { firebase_librox } from "../FireBase";
import "../AdminSide_CSS(File)/AddBookAD.css";
import { client } from "filestack-react";
import toast, { Toaster } from "react-hot-toast";

const AddBookAD = () => {
  const [bkname, setBkname] = useState("");
  const [bcat, setBcat] = useState("");
  const [auname, setAuname] = useState("Unknown");
  const [photoFile, setPhotoFile] = useState("");
  const [pdfFile, setPdfFile] = useState("");
  const [audioFile, setAudioFile] = useState("");
  const [rsdate, setRsdate] = useState("Unknown");
  const [lang, setLang] = useState("");
  const [bkAccess, setBkAccess] = useState("");
  const [bkQuantity, setBkQuantity] = useState("");
  const [price, setPrice] = useState("");
  const addBook = async (e) => {
    e.preventDefault();
    try {
      toast("Book is uploading for selling...", {
        duration: 3000,
      });
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
      const length = 5;
      let newCode = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        newCode += characters[randomIndex];
      }

      const fileStack = client.init("ATuYVTP9T1a7cWnFl3uUAz");
      const filePhoto = await fileStack.upload(photoFile);
      const filePDF = await fileStack.upload(pdfFile);
      const fileAudio = await fileStack.upload(audioFile);

      await addDoc(collection(firebase_librox, "Books"), {
        Book_id: newCode,
        Name: bkname,
        Categary: bcat,
        Auther: auname,
        photo_url: filePhoto.url,
        pdf_url: filePDF.url,
        audio_url: fileAudio.url,
        Release_Date: rsdate,
        Language: lang,
        BooKAccess: bkAccess,
        Remaining: bkQuantity,
        Price: price,
        Like: 0,
        Sold: 0,
      });

      await addDoc(collection(firebase_librox, "Notification"), {
        message: `A new book is uploaded by LibroX name ${bkname} at time ${new Date().toLocaleString()} Checknow.`,
        expire_time: Date.now() + 7 * 24 * 60 * 60 * 1000,
      });

      toast.success("Book is uploaded for Selling.");
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };
  return (
    <div className="addbookAD-wrapper">
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
      <div className="addbookAD-formContainer">
        <h1>Sell Books</h1>
        <form onSubmit={addBook} className="addbookAD-form">
          <label htmlFor="bkname">Name</label>
          <input
            type="text"
            onChange={(e) => setBkname(e.target.value)}
            required
          />

          <label htmlFor="categry">Categary</label>
          <select
            onChange={(e) => {
              setBcat(e.target.value);
            }}
            required
          >
            <option value="">Select</option>
            <option value="horror">Horror</option>
            <option value="funny">Funny</option>
            <option value="action">Action</option>
            <option value="novel">Novel</option>
            <option value="manga">Manga</option>
          </select>

          <label htmlFor="Auname">Auther</label>
          <input
            type="text"
            onChange={(e) => setAuname(e.target.value)}
            placeholder="optional"
          />

          <label htmlFor="BookPhoto">Upload Book Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhotoFile(e.target.files[0])}
            required
          />

          <label htmlFor="BookPDF">Upload Book(PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
            required
          />

          <label htmlFor="BookAudion">Book Audio</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files[0])}
            required
          />

          <label htmlFor="rsdate">Release Date</label>
          <input
            type="date"
            onChange={(e) => setRsdate(e.target.value)}
            placeholder="optional"
          />

          <label htmlFor="lang">Language</label>
          <input
            type="text"
            onChange={(e) => setLang(e.target.value)}
            required
          />

          <label htmlFor="BookAccess">Book Access</label>
          <select
            onChange={(e) => {
              setBkAccess(e.target.value);
            }}
            required
          >
            <option value="">Select</option>
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
          </select>

          <label htmlFor="quantity">Quantity(Delivery)</label>
          <input
            type="number"
            onChange={(e) => setBkQuantity(Number(e.target.value))}
            required
          />

          <label htmlFor="price">Price(Delivery)</label>
          <input
            type="numbers"
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
          <button type="submit">Sell Book</button>
        </form>
      </div>
    </div>
  );
};

export default AddBookAD;

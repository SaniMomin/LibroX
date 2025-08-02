import React, { useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { firebase_librox } from "../FireBase";
import "../AdminSide_CSS(File)/AddBookAD.css";
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
  const [isUploading, setIsUploading] = useState(false);
  const formRef = useRef(null);

  const addBook = async (e) => {
    e.preventDefault();
    try {
      setIsUploading(true); // disable button

      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
      const length = 5;
      let newCode = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        newCode += characters[randomIndex];
      }

      // IMAGE
      const data1 = new FormData();
      data1.append("file", photoFile);
      data1.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      );
      data1.append("folder", "librox_images");
      const res1 = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data1,
        }
      );
      const uploadedImageURL = await res1.json();
      if (!uploadedImageURL.secure_url) {
        toast.error("Error image is not upload try again after some time.");
        setIsUploading(false); // enable button
        return;
      }

      // PDF
      const data2 = new FormData();
      data2.append("file", pdfFile);
      data2.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      );
      data2.append("folder", "librox_pdfs");
      const res2 = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: data2,
        }
      );
      const uploadedpdfURL = await res2.json();
      if (!uploadedpdfURL.secure_url) {
        toast.error("Error pdf is not upload try again after some time.");
        setIsUploading(false); // enable button
        return;
      }

      // AUDIO
      const data3 = new FormData();
      data3.append("file", audioFile);
      data3.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      );
      data3.append("folder", "librox_audios");
      const res3 = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/video/upload`,
        {
          method: "POST",
          body: data3,
        }
      );
      const uploadedAudioURL = await res3.json();
      if (!uploadedAudioURL.secure_url) {
        toast.error("Error audio is not upload try again after some time.");
        setIsUploading(false); // enable button
        return;
      }

      // Saved data to firebase in Books Collection
      await addDoc(collection(firebase_librox, "Books"), {
        Book_id: newCode,
        Name: bkname,
        Categary: bcat,
        Auther: auname,
        photo_url: uploadedImageURL.secure_url,
        pdf_url: uploadedpdfURL.secure_url,
        audio_url: uploadedAudioURL.secure_url,
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
      setIsUploading(false); // enable button

      // Reset all inputs
      setBkname("");
      setBcat("");
      setAuname("Unknown");
      setPhotoFile("");
      setPdfFile("");
      setAudioFile("");
      setRsdate("Unknown");
      setLang("");
      setBkAccess("");
      setBkQuantity("");
      setPrice("");

      // Reset the form (especially for file inputs)
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
      setIsUploading(false); // enable button
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
        <form onSubmit={addBook} ref={formRef} className="addbookAD-form">
          <label htmlFor="bkname">Name *</label>
          <input
            type="text"
            onChange={(e) => setBkname(e.target.value)}
            required
          />

          <label htmlFor="categry">Categary *</label>
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

          <label htmlFor="BookPhoto">Upload Book Photo *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhotoFile(e.target.files[0])}
            required
          />

          <label htmlFor="BookPDF">Upload Book(PDF) *</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
            required
          />

          <label htmlFor="BookAudion">Book Audio *</label>
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

          <label htmlFor="lang">Language *</label>
          <input
            type="text"
            onChange={(e) => setLang(e.target.value)}
            required
          />

          <label htmlFor="BookAccess">Book Access *</label>
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

          <label htmlFor="quantity">Quantity(Delivery) *</label>
          <input
            type="number"
            onChange={(e) => setBkQuantity(Number(e.target.value))}
            required
          />

          <label htmlFor="price">Price(Delivery) *</label>
          <input
            type="number"
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
          <button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookAD;

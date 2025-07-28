import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../AdminSide_CSS(File)/UpdateBookAD.css";
import { firebase_librox } from "../FireBase";
import toast, { Toaster } from "react-hot-toast";
import { client } from "filestack-react";

const UpdateBookAD = () => {
  const location = useLocation();
  const [bookDetails, setBookDetails] = useState(location.state);
  const navigate = useNavigate();
  const fileStack = client.init(process.env.REACT_APP_FILESTACK_API_KEY);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      toast("Data is Updating...", {
        duration: 1000,
      });
      
      const refDoc = doc(firebase_librox, "Books", bookDetails.id);
      await updateDoc(refDoc, bookDetails);

      //Add notification for user alert.
      await addDoc(collection(firebase_librox, "Notification"), {
        message: `Something updated by LibroX of book ${
          bookDetails.Name
        } at time ${new Date().toLocaleString()} Checknow.`,
        expire_time: Date.now() + 7 * 24 * 60 * 60 * 1000,
      });

      toast.success("Data is Updated!");

      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  return (
    <div className="UpdateBookAD-wrapper">
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
      <div className="UpdateBookAD-formContainer">
        <h1>Update Deatils</h1>
        <form onSubmit={handleUpdate} className="UpdateBookAD-form">
          <label htmlFor="Name">New Name:</label>
          <input
            type="text"
            onChange={(e) =>
              setBookDetails({ ...bookDetails, Name: e.target.value })
            }
            placeholder={bookDetails.Name}
          />

          <label htmlFor="photo">Update Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const photo = e.target.files[0];
              const photoFile = await fileStack.upload(photo);
              setBookDetails({ ...bookDetails, photo_url: photoFile.url });
            }}
          />

          <label htmlFor="photo">Update PDF:</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={async (e) => {
              const pdf = e.target.files[0];
              const pdfFile = await fileStack.upload(pdf);
              setBookDetails({ ...bookDetails, pdf_url: pdfFile.url });
            }}
          />

          <label htmlFor="audio">Update Audio:</label>
          <input
            type="file"
            accept="audio/*"
            onChange={async (e) => {
              const audio = e.target.files[0];
              const audioFile = await fileStack.upload(audio);
              setBookDetails({ ...bookDetails, audio_url: audioFile.url });
            }}
          />

          <label htmlFor="BooKAccess">Update Book Access:</label>
          <input
            type="text"
            onChange={(e) =>
              setBookDetails({ ...bookDetails, BooKAccess: e.target.value })
            }
            placeholder={bookDetails.BooKAccess}
          />

          <label htmlFor="Language">Update Language:</label>
          <input
            type="text"
            onChange={(e) =>
              setBookDetails({ ...bookDetails, Language: e.target.value })
            }
            placeholder={bookDetails.Language}
          />

          <label htmlFor="stock">Update Stock(Delivery):</label>
          <input
            type="number"
            onChange={(e) =>
              setBookDetails({ ...bookDetails, Remaining: Number(e.target.value) })
            }
            placeholder={bookDetails.Remaining}
          />

          <label htmlFor="Price">Update Price(Delivery):</label>
          <input
            type="number"
            onChange={(e) =>
              setBookDetails({ ...bookDetails, Price: Number(e.target.value) })
            }
            placeholder={bookDetails.Price}
          />

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookAD;

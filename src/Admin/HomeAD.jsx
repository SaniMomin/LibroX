import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { firebase_librox } from "../FireBase";
import "../AdminSide_CSS(File)/HomeAD.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const HomeAD = () => {
  const [bookList, setBookList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch_books();
  });

  const fetch_books = async () => {
    try {
      const refQuery = query(
        collection(firebase_librox, "Books"),
        orderBy("Name", "asc")
      );
      const refDocs = await getDocs(refQuery);
      const data = refDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookList(data);
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  const handleUpdate = (bookDet) => {
    navigate("/adminDashboard/updateBookAD", { state: bookDet });
  };

  const handleRemove = async (bkdocid, bkname) => {
    try {
      const refDoc = doc(firebase_librox, "Books", bkdocid);
      await deleteDoc(refDoc);

      await addDoc(collection(firebase_librox, "Notification"), {
        message: `A book is Removed by LibroX name ${bkname} at time ${new Date().toLocaleString()}.`,
        expire_time: Date.now() + 7 * 24 * 60 * 60 * 1000,
      });
      
      toast.success("Book Removed!");
      fetch_books();
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  const handleComment = (bkid) => {
    navigate(`/adminDashboard/commentsAD/${bkid}`);
  };

  return (
    <div className="HomeAD-wrapper">
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
      <h1>All Books</h1>
      {bookList.length > 0 ? (
        <div className="HomeAD-booklistContainer">
          {bookList.map((book) => (
            <div key={book.id} className="HomeAD-Book">
              <div className="HomeAD-IMG">
                <img src={book.photo_url} alt="Error" />
              </div>
              <div className="HomeAD-bookInfo">
                <p>Name:{book.Name}</p>
                <p>Category:{book.Categary}</p>
                <p>Author:{book.Auther}</p>
                <p>Language:{book.Language}</p>
                <p>Release Date:{book.Release_Date}</p>
                <p>BooK Access:{book.BooKAccess}</p>
                <p>Remaining:{book.Remaining}</p>
                <p>Like:{book.Like}</p>
                <p>Price:{book.Price}</p>
                <button onClick={() => handleUpdate(book)}>Update</button>
                <button onClick={() => handleRemove(book.id, book.Name)}>
                  Remove
                </button>
                <button onClick={() => handleComment(book.Book_id)}>
                  Comments
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default HomeAD;

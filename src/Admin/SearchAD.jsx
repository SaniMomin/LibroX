import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { firebase_librox } from "../FireBase";
import "../AdminSide_CSS(File)/SearchAD.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const SearchAD = () => {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");
  const [search, setSearch] = useState("");
  const [bookList, setBookList] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const refQuery = query(
        collection(firebase_librox, "Books"),
        where(select, "==", search)
      );
      const refDocs = await getDocs(refQuery);
      const data = refDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (data.length > 0) {
        setBookList(data);
      } else {
        toast("Not found", {
          duration: 3000,
        });
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  const handleUpdate = (bookDet) => {
    navigate("/adminDashboard/updateAD", { state: bookDet });
  };

  const handleDelete = async (bkdocid, bkname) => {
    try {
      const refDoc = doc(firebase_librox, "Books", bkdocid);
      await deleteDoc(refDoc);

      await addDoc(collection(firebase_librox, "Notification"), {
        message: `A book is Removed by LibroX name ${bkname} at time ${new Date().toLocaleString()}.`,
        expire_time: Date.now() + 15 * 24 * 60 * 60 * 1000,
      });
      toast.success("Book Removed!");
      setTimeout(() => {
        navigate("/adminDashboard/homeUR");
      }, 1500);
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  const handleComment = (bkid) => {
    navigate(`/adminDashboard/comments/${bkid}`);
  };
  
  return (
    <div className="SearchAD-wrapper">
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
      <form onSubmit={handleSearch} className="SearchAD-searchContainer">
        <select onChange={(e) => setSelect(e.target.value)} required>
          <option value="">Browse</option>
          <option value="Name">Name</option>
          <option value="Auther">Auther</option>
          <option value="Categary">Categary</option>
          <option value="Language">Language</option>
        </select>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          required
        />
        <button type="submit">Search</button>
      </form>
      {bookList.length > 0 ? (
        <div className="SearchAD-booklistContainer">
          {bookList.map((book) => (
            <div key={book.id} className="SearchAD-Book">
              <div className="SearchAD-IMG">
                <img src={book.photo_url} alt="Error" />
              </div>
              <div className="SearchAD-bookInfo">
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
                <button onClick={() => handleDelete(book.id, book.Name)}>
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
        <h1>Search Things</h1>
      )}
    </div>
  );
};

export default SearchAD;

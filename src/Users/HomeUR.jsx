import React, { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firebase_librox } from "../FireBase"; // Adjust the path as needed
import "react-toastify/dist/ReactToastify.css";
import "../UserSide_CSS(Files)/HomeUR.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const HomeUR = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState();
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    fetch_User();
    fetch_AllBooks();
  }, []);

  const fetch_User = async () => {
    try {
      const refQuery = query(
        collection(firebase_librox, "Users"),
        where("UID", "==", localStorage.getItem("id"))
      );
      const refDocs = await getDocs(refQuery);
      const data = refDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserDetails(data[0]);
    } catch (e) {
      console.error(e.message || "Something went wrong!");
    }
  };

  const fetch_AllBooks = async () => {
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
      console.error(e.message || "Something went wrong!");
    }
  };

  const handleBook = (bookID) => {
    if (userDetails.Subscription === true) {
      navigate(`/userDashboard/bookDetailsUR/${bookID}`);
    } else {
      navigate("/userDashboard/advertiseUR", { state: bookID });
    }
  };

  const handleSearch = () => {
    navigate("/userDashboard/searchUR");
  };

  const handleFilter = async (cat) => {
    try {
      const refQuery = query(
        collection(firebase_librox, "Books"),
        where("Categary", "==", cat)
      );
      const refDocs = await getDocs(refQuery);
      const data = refDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (data.length > 0) {
        setBookList(data);
      } else {
        toast("Content not available yet — we’ll upload it soon!", {
          duration: 3000,
        });
        return;
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  return (
    <div className="HomeUR-wrapper">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            backgroundColor: "#5a432e", // A warm brown that matches your theme
            color: "#fefae0", // Soft ivory/yellowish text
            fontSize: "14px",
            border: "1px solid #d1b18d", // Tie it in with the beige
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          },
        }}
      />
      <div className="HomeUR-welcomeUser">
        <h2>Welcome to LibroX</h2>
        <p>Browse and buy books from our vast collection of digital books.</p>
        <button onClick={() => handleSearch()}>
          Search Your Favourite Book
        </button>
      </div>
      <div className="HomeUR-buttonListContainer">
        <button onClick={() => fetch_AllBooks()}>All</button>
        <button onClick={() => handleFilter("horror")}>Horror</button>
        <button onClick={() => handleFilter("funny")}>Funny</button>
        <button onClick={() => handleFilter("action")}>Action</button>
        <button onClick={() => handleFilter("novel")}>Novel</button>
        <button onClick={() => handleFilter("manga")}>Manga</button>
      </div>
      <h1>Your Fav Books Now on LibroX</h1>
      <div className="HomeUR-bookListContainer">
        {bookList.length > 0 ? (
          bookList.map((book) => (
            <div
              key={book.id}
              className="HomeUR-book"
              onClick={() => handleBook(book.Book_id)}
            >
              <img src={book.photo_url} alt="Error" />
              <p>
                <strong>{book.Name}</strong>
              </p>
              <p>Access : {book.BooKAccess}</p>
              <p>Price : {book.Price}</p>
              <div className="HomeUR-LikeSold">
                <div>❤️ {book.Like}</div>
                <div>🛒 {book.Sold}</div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="Loading-HomeUR">Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default HomeUR;

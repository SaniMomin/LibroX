import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firebase_librox } from "../FireBase";
import { useNavigate } from "react-router-dom";
import "../UserSide_CSS(Files)/Search.css";
import toast, { Toaster } from "react-hot-toast";

const SearchUR = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState();
  const [bookList, setBookList] = useState([]);
  const [select, setSelect] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    fetch_User();
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
      toast.error(e.message || "Something went wrong!");
    }
  };

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
        toast("Not found!");
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  const handleBook = (bid) => {
    if (userDetails.Subscription === true) {
      navigate(`/userDashboard/bookDetailsUR/${bid}`);
    } else {
      navigate("/userDashboard/advertiseUR", { state: bid });
    }
  };

  return (
    <div className="SearchUR-wrapper">
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
      <form onSubmit={handleSearch} className="SearchUR-SearchContainer">
        <select onChange={(e) => setSelect(e.target.value)} required>
          <option value="">Browse</option>
          <option value="Name">Name</option>
          <option value="Auther">Auther</option>
          <option value="Language">Language</option>
        </select>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Books on LibroX"
          required
        />
        <button type="submit">Search</button>
      </form>
      {bookList.length > 0 ? (
        <div className="SearchUR-bookList">
          {bookList.map((book) => (
            <div
              key={book.id}
              onClick={() => handleBook(book.Book_id)}
              className="SearchUR-book"
            >
              <img src={book.photo_url} alt="Error" />
              <p>
                <strong>{book.Name}</strong>
              </p>
              <p>Access : {book.BooKAccess}</p>
              <p>Price : {book.Price}</p>
              <div className="SearchUR-LikeSold">
                <div>❤️ {book.Like}</div>
                <div>🛒 {book.Sold}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="SearchUR-SearchThing">Search Things here</h1>
      )}
    </div>
  );
};

export default SearchUR;

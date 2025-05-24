import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firebase_librox } from "../FireBase";
import { useNavigate } from "react-router-dom";
import "../UserSide_CSS(Files)/WishlistUR.css";
import toast, { Toaster } from "react-hot-toast";

const WishlistUR = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState();
  const [bookList, setBookList] = useState([]);
  
  useEffect(() => {
    fetch_userdata();
  }, []);

  const fetch_userdata = async () => {
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

      if (data[0].Wishlist.length > 0) {
        setUserDetails(data[0]);
        fetch_Bookdata(data[0].Wishlist);
      } else {
        setLoading(false);
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  const fetch_Bookdata = async (userWish) => {
    try {
      const refbook = collection(firebase_librox, "Books");

      let arr1 = [];
      for (let i = 0; i < userWish.length; i += 10) {
        const bookIds = userWish.slice(i, i + 10); //fetch 10 10 ids from purchase array
        const bookquery = query(refbook, where("Book_id", "in", bookIds));

        const data = await getDocs(bookquery);

        const book = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        arr1.push(book);
      }

      setBookList(arr1.flat());
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  const handleBook = (bookID) => {
    if (userDetails.Subscription === true) {
      navigate(`/userDashboard/bookDetailsUR/${bookID}`);
    } else {
      navigate("/userDashboard/advertiseUR", { state: bookID });
    }
  };

  const handleRemove = async (bookID) => {
    try {
      let arr1 = userDetails.Wishlist.filter((value) => {
        if (value !== bookID) {
          return value;
        }
      });
      const refDocsuser = doc(firebase_librox, "Users", userDetails.id);
      await updateDoc(refDocsuser, {
        Wishlist: arr1,
      });
      setUserDetails({ ...userDetails, Wishlist: arr1 });
      let arr2 = bookList.filter((value) => {
        if (value.Book_id !== bookID) {
          return value;
        }
      });
      if (arr2.lenght > 0) {
        setBookList(arr2);
      } else {
        setBookList(arr2);
        setLoading(false);
      }
      toast.success("Removed from WishLsit!");
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  return (
    <div className="WishlistUR-wrapper">
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
      <h1>Wishlist</h1>
      <div className="WishlistUR-booklist">
        {bookList.length > 0 ? (
          bookList.map((book) => (
            <div className="WishlistUR-book" key={book.id}>
              <div className="WishlistUR-img">
                <img src={book.photo_url} />
              </div>
              <div className="WishlistUR-bookDetail">
                <p>
                  <strong>{book.Name}</strong>
                </p>
                <p>Access : {book.BooKAccess}</p>
                <p>Price : {book.Price}</p>
                <p>
                  <strong>
                    ❤️ {book.Like} 🛒 {book.Sold}
                  </strong>
                </p>
                <button onClick={() => handleRemove(book.Book_id)}>
                  Remove
                </button>
                <button onClick={() => handleBook(book.Book_id)}>Open</button>
              </div>
            </div>
          ))
        ) : (
          <h1>{loading === true ? "Loading..." : "No Saved Books"}</h1>
        )}
      </div>
    </div>
  );
};

export default WishlistUR;

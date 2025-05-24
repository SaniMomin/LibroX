import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebase_librox } from "../FireBase";
import "../UserSide_CSS(Files)/LikesUR.css";
import toast, { Toaster } from "react-hot-toast";

const LikesUR = () => {
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

      if (data[0].Like.length > 0) {
        setUserDetails(data[0]);
        fetch_Bookdata(data[0].Like);
      } else {
        setLoading(false);
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  const fetch_Bookdata = async (userlike) => {
    try {
      const refColl = collection(firebase_librox, "Books");

      let arr1 = [];
      for (let i = 0; i < userlike.length; i += 10) {
        const bookIds = userlike.slice(i, i + 10); //fetch 10 10 ids from purchase array
        const bookQuery = query(refColl, where("Book_id", "in", bookIds));

        const refDocs = await getDocs(bookQuery);

        const data = refDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        arr1.push(data);
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
      let arr1 = userDetails.Like.filter((value) => {
        if (value !== bookID) {
          return value;
        }
      });
      const refDoc = doc(firebase_librox, "Users", userDetails.id);
      await updateDoc(refDoc, {
        Like: arr1,
      });
      setUserDetails({ ...userDetails, Like: arr1 });
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
      toast.success("Removed from Like!");
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  return (
    <div className="LikesUR-wrapper">
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
      <h1>Likes</h1>
      <div className="LikesUR-bookList">
        {bookList.length > 0 ? (
          bookList.map((book) => (
            <div className="LikesUR-book" key={book.id}>
              <div className="LikesUR-img">
                <img src={book.photo_url} />
              </div>
              <div className="LikesUR-bookDetail">
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
          <h1>{loading === true ? "Loading..." : "No Liked Books"}</h1>
        )}
      </div>
    </div>
  );
};

export default LikesUR;

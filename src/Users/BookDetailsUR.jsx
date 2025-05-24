import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firebase_librox } from "../FireBase";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { FaShoppingCart } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import "../UserSide_CSS(Files)/BookDetailsUR.css";

const BookDetailsUR = () => {
  const { bid } = useParams();
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState();
  const [commentlist, setCommentlist] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [comment, setcomment] = useState();

  useEffect(() => {
    fetch_Book();
    fetch_BComment();
    fetch_User();
  }, []);

  const fetch_Book = async () => {
    try {
      const refQuery = query(
        collection(firebase_librox, "Books"),
        where("Book_id", "==", bid)
      );
      const refDocs = await getDocs(refQuery);
      const data = refDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookDetails(data[0]);
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  const fetch_BComment = async () => {
    try {
      const refQuery = query(
        collection(firebase_librox, "BKComment"),
        where("bookid", "==", bid)
      );
      const refDocs = await getDocs(refQuery);
      const data = refDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommentlist(data);
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

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

      //User subscription expire check
      if (data[0].Subscription === true) {
        if (Date.now() <= data[0].Subscription_expire) {
          setUserDetails(data[0]);
        } else {
          //user subscription expired
          const docUserRL = doc(firebase_librox, "Users", data[0].id);
          await updateDoc(docUserRL, {
            Subscription: false,
            Subscription_expire: null,
          });

          data[0].Subscription = false;
          data[0].Subscription_expire = null;

          setUserDetails(data[0]);
        }
      } else {
        setUserDetails(data[0]);
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  const handlereadlist = async () => {
    try {
      const refUserdoc = doc(firebase_librox, "Users", userDetails.id);
      if (userDetails.Wishlist.includes(bookDetails.Book_id)) {
        let arr1 = userDetails.Wishlist.filter((value) => {
          if (value !== bookDetails.Book_id) {
            return value;
          }
        });
        await updateDoc(refUserdoc, {
          Wishlist: arr1,
        });
        setUserDetails({ ...userDetails, Wishlist: arr1 });
        toast.success("Removed from Wishlist!");
      } else {
        await updateDoc(refUserdoc, {
          Wishlist: [...userDetails.Wishlist, bookDetails.Book_id],
        });
        setUserDetails({
          ...userDetails,
          Wishlist: [...userDetails.Wishlist, bookDetails.Book_id],
        });
        toast.success("Added to Wishlist!");
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  const handlelike = async () => {
    try {
      const refBookdoc = doc(firebase_librox, "Books", bookDetails.id);
      const refUserdoc = doc(firebase_librox, "Users", userDetails.id);
      if (userDetails.Like.includes(bookDetails.Book_id)) {
        await updateDoc(refBookdoc, {
          Like: bookDetails.Like - 1,
        });
        let arr1 = userDetails.Like.filter((value) => {
          if (value !== bookDetails.Book_id) {
            return value;
          }
        });
        await updateDoc(refUserdoc, {
          Like: arr1,
        });
        setBookDetails({ ...bookDetails, Like: bookDetails.Like - 1 });
        setUserDetails({ ...userDetails, Like: arr1 });
        toast.success("Unliked!");
      } else {
        await updateDoc(refBookdoc, {
          Like: bookDetails.Like + 1,
        });
        await updateDoc(refUserdoc, {
          Like: [...userDetails.Like, bookDetails.Book_id],
        });
        setBookDetails({ ...bookDetails, Like: bookDetails.Like + 1 });
        setUserDetails({
          ...userDetails,
          Like: [...userDetails.Like, bookDetails.Book_id],
        });
        toast.success("Liked!");
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  const handleComment = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(firebase_librox, "BKComment"), {
        bookid: bookDetails.Book_id,
        Username: userDetails.Name,
        Comment: comment,
        Time: Date.now(),
      });
      setCommentlist([
        ...commentlist,
        {
          bookid: bookDetails.Book_id,
          Username: userDetails.Name,
          Comment: comment,
          Time: Date.now(),
        },
      ]);
      toast.success("Comment Added!");
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  const handlePDF = () => {
    if (bookDetails.BooKAccess === "Free") {
      navigate("/userDashboard/readingpdfUR", { state: bookDetails.pdf_url });
    } else {
      if (userDetails.Subscription === true) {
        navigate("/userDashboard/readingpdfUR", { state: bookDetails.pdf_url });
      } else {
        toast("You Don't have Premium!");
      }
    }
  };

  const handleAudio = () => {
    if (bookDetails.BooKAccess === "Free") {
      navigate("/userDashboard/listeningpdfUR", {
        state: bookDetails.audio_url,
      });
    } else {
      if (userDetails.Subscription === true) {
        navigate("/userDashboard/listeningpdfUR", {
          state: bookDetails.audio_url,
        });
      } else {
        toast("You Don't have Premium!");
      }
    }
  };

  const handleOrder = () => {
    navigate("/userDashboard/orderBookUR", {
      state: { userDet: userDetails, bookDet: bookDetails },
    });
  };

  return (
    <div className="BookDetails-wrapper">
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
      {userDetails ? (
        <div className="BookDetails-Container">
          <div className="BookDetails-ContainerTop">
            <div className="BookDetails-leftSection">
              <div className="BookDetails-coverImage">
                <img src={bookDetails.photo_url} alt="Book Cover" />
              </div>
              <div className="BookDetails-actionButtons">
                <button onClick={() => handlelike()}>
                  {userDetails.Like.includes(bookDetails.Book_id)
                    ? "Liked"
                    : "Like"}
                </button>
                <button onClick={() => handlereadlist()}>
                  {userDetails.Wishlist.includes(bookDetails.Book_id)
                    ? "Saved"
                    : "Save"}
                </button>
              </div>
            </div>
            <div className="BookDetails-rightSection">
              <p>Title:{bookDetails.Name}</p>
              <p>Auther:{bookDetails.Auther}</p>
              <p>Categary:{bookDetails.Categary}</p>
              <p>Language:{bookDetails.Language}</p>
              <p>Release_Date:{bookDetails.Release_Date}</p>
              <p>Likes:{bookDetails.Like}</p>
              <p>Sold:{bookDetails.Sold}</p>
              <p>Remaining:{bookDetails.Remaining}</p>
              <h3>{bookDetails.BooKAccess}</h3>
              <div className="BookDetails-Button">
                <button onClick={() => handlePDF()}>Read</button>
                <button onClick={() => handleAudio()}>Listen</button>
              </div>
              <h3>Price:{bookDetails.Price}</h3>
              <button onClick={() => handleOrder()}>
                <FaShoppingCart /> Buy
              </button>
            </div>
          </div>
          <div className="BookDetails-ContainerBottom">
            <h3>Comments</h3>
            <form onSubmit={handleComment} className="BookDetails-addcomment">
              <input
                type="text"
                placeholder="Comment"
                onChange={(e) => setcomment(e.target.value)}
                required
              />
              <button type="submit">➤</button>
            </form>
            {commentlist.length > 0 ? (
              <div className="BookDetails-commentlist">
                {commentlist.map((comment) => (
                  <div className="BookDetails-comment">
                    <p>
                      @{comment.Username}•
                      {new Date(comment.Time).toLocaleDateString()}
                    </p>
                    <p>{comment.Comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <h1>No Comments</h1>
            )}
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default BookDetailsUR;

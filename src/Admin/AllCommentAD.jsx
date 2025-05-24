import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firebase_librox } from "../FireBase";
import "../AdminSide_CSS(File)/AllCommentAD.css";
import toast, { Toaster } from "react-hot-toast";

const AllCommentAD = () => {
  const { bkid } = useParams();
  const [loading, setLoading] = useState(true);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    fetch_comments();
  });

  const fetch_comments = async () => {
    try {
      const refQuery = query(
        collection(firebase_librox, "BKComment"),
        where("bookid", "==", bkid)
      );
      const refDocs = await getDocs(refQuery);
      const data = refDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (data.length > 0) {
        setCommentList(data);
      } else {
        setLoading(false);
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong!");
    }
  };

  return (
    <div className="AllCommentAD-wrapper">
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
      <h1>Comments</h1>
      {commentList.length > 0 ? (
        <div className="AllCommentAD-CommentList">
          {commentList.map((comment) => (
            <div key={comment.id} className="AllCommentAD-Comment">
              <pre className="AllCommentAD-commentPara1">
                @{comment.Username} {new Date(comment.Time).toLocaleDateString()}
              </pre>
              <pre className="AllCommentAD-commentPara2">{comment.Comment}</pre>
            </div>
          ))}
        </div>
      ) : (
        <h1>{loading === true ? "Loading..." : "No Comments"}</h1>
      )}
    </div>
  );
};

export default AllCommentAD;

import { collection, where, query, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firebase_librox } from "../FireBase";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "../UserSide_CSS(Files)/ProfileUR.css";
import toast, { Toaster } from "react-hot-toast";

const ProfileUR = () => {
  const date = new Date();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    fetch_userData();
  }, []);

  const fetch_userData = async () => {
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

  //Function is sending user to change his Profile Details.
  const handleUpdateProfile = () => {
    navigate("/userDashboard/updateProfileUR", { state: userDetails });
  };

  //Function is sending user to change his Profile Photo.
  const handleUpdateImage = () => {
    navigate("/userDashboard/updatePhotoUR", { state: userDetails.id });
  };

  //Logout Button Function.
  const handleLogout = () => {
    const ans = window.confirm("Are you sure,you want to Logout");
    if (ans === true) {
      localStorage.setItem("id", "");
      navigate("/loginUR");
    }
  };

  //Function is sending user to change his Account Password.
  const handleChangePassword = () => {
    navigate("/passwordChange");
  };

  //Function is sending user to Buy Subscription.
  const handleBuySub = () => {
    if (userDetails.Subscription === true) {
      toast("You have already Premium!");
    } else {
      navigate("/userDashboard/subscriptionListUR");
    }
  };

  //Function is sending user to see his All Order.
  const handleOrder = () => {
    navigate("/userDashboard/orderListUR");
  };

  //Function is sending user to see his Liked Books.
  const handleLikes = () => {
    navigate("/userDashboard/liked");
  };

  //Function is sending user to see his Saved Books.
  const handleWishlist = () => {
    navigate("/userDashboard/wishlistUR");
  };

  //Function is sending user to Notification Alert.
  const handleNotification = () => {
    navigate("/userDashboard/notificationUR");
  };

  return (
    <div className="ProfileUR-wrapper">
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
      <div className="ProfileUR-ProfileContainer">
        {userDetails ? (
          <div className="ProfileUR-profileDetails">
            <div className="ProfileUR-userDetails">
              <div className="ProfileUR-Img">
                <img src={userDetails.Photo_url} alt="Error" />
                <p>{userDetails.email}</p>
                <div className="ProfileUR-logoutBTN">
                  <button onClick={() => handleUpdateImage()}>
                    Update Picture
                  </button>
                  <button onClick={() => handleLogout()}>Logout</button>
                </div>
              </div>
              <div className="ProfileUR-Info">
                <p>
                  <FaUser />
                  User Name: {userDetails.Name}
                </p>
                <p>
                  <FaUser />
                  Date of Birth: {userDetails.DOB}
                </p>
                <p>
                  <FaUser />
                  Gender: {userDetails.Gender}
                </p>
                <p>
                  <FaPhoneAlt />
                  Phone: {userDetails.Phone}
                </p>
                <p>
                  <FaMapMarkerAlt />
                  Address: {userDetails.Address}
                </p>
                <p>
                  <FaMapMarkerAlt />
                  Subscription :
                  {userDetails.Subscription === true
                    ? " Subscribed"
                    : "No Subscription"}
                </p>
                <p>
                  <FaMapMarkerAlt />
                  Subscritption Expire in :
                  {userDetails.Subscription_expire === null
                    ? " No Subscription"
                    : ` ${new Date(
                        userDetails.Subscription_expire
                      ).toLocaleString()}`}
                </p>
              </div>
            </div>
            <div className="ProfileUR-updateButtons">
              <button onClick={() => handleChangePassword()}>
                Change Password
              </button>
              <button onClick={() => handleUpdateProfile()}>
                Edit Profile
              </button>
              <button onClick={() => handleBuySub()}>Buy Subscription</button>
            </div>
            <div className="ProfileUR-savedButtons">
              <button onClick={() => handleOrder()}>Orders</button>
              <button onClick={() => handleLikes()}>Liked</button>
              <button onClick={() => handleWishlist()}>ReadList</button>
              <button onClick={() => handleNotification()}>Notification</button>
            </div>
          </div>
        ) : (
          <h1 className="loading-message">Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default ProfileUR;

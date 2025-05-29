import React from "react";
import "../UserSide_CSS(Files)/ContactUR.css";
import { useNavigate } from "react-router-dom";

const ContactUR = () => {
  const navigate=useNavigate();

  const handleReport=()=>{
    navigate("/userDashboard/reportEmail");
  };

  return (
    <div className="ContactUR-wrapper">
      <div className="ContactUR-container">
        <div className="ContactUR-left">
          <h2>Contact with Us</h2>
          <p>
            Have any question or need assistance? We're here to help! Reach out
            to our dedicated support team today.
          </p>
          <h3>Customer Care:</h3>
          <p>
            <strong>Contact 1:</strong> 2222291725
          </p>
          <p>
            <strong>Contact 2:</strong> 3333391725
          </p>
          <p>
            <strong>Contact 3:</strong> 55555917253
          </p>
          <button onClick={()=> handleReport()}>Email Us</button>
        </div>
        <div className="ContactUR-right">
          <img src="/images/ContactImg.png" alt="Contact" />
        </div>
      </div>
    </div>
  );
};

export default ContactUR;

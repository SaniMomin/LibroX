import React from "react";
import "../UserSide_CSS(Files)/AboutUR.css";

const AboutUR = () => {
  return (
    <div className="AboutUR-wrapper">
      <div className="AboutUR-about-section">
        <div className="AboutUR-about-text">
          <h2>About us</h2>
          <p>
            Welcome to <strong>LibroX</strong>, your one-stop platform for
            reading and listening to books online. We offer a wide collection
            of books to suit every reader. Enjoy seamless access anytime,
            anywhere, and get physical books delivered across Maharashtra. Dive
            into a world of stories with LibroX!
          </p>
        </div>
        <div className="AboutUR-about-image">
          <img src="/images/AboutImg1.jpg" alt="About" />
        </div>
      </div>

      <div className="AboutUR-about-section reverse">
        <div className="AboutUR-about-image">
          <img src="/images/AboutImg2.jpg" alt="Delivery" />
        </div>
        <div className="AboutUR-about-text">
          <h2>Delivery</h2>
          <p>
            At LibroX, we believe in building a strong community of readers and
            listeners. We regularly host online book discussions and
            interactive sessions with authors. Our platform encourages user
            reviews and recommendations, fostering a shared love for
            literature. Join us in creating a vibrant reading culture across
            Maharashtra.
          </p>
        </div>
      </div>

      <div className="AboutUR-about-section">
        <div className="AboutUR-about-text">
          <h2>Transparency and Trust</h2>
          <p>
            Transparency and Trust are the cornerstones of our platform. We
            believe in building honest relationships with users and ensuring
            transparency at every step.
          </p>
        </div>
        <div className="AboutUR-about-image">
          <img src="/images/AboutImg3.png" alt="Transparency" />
        </div>
      </div>

      <div className="AboutUR-team-section">
        <h2>Meet Our Team</h2>
        <p>Get to know the passionate individuals who drive our mission forward</p>
        <div className="AboutUR-team-grid">
          <div className="AboutUR-team-member">
            <img src="/images/AboutImg4.jpg" alt="Sani Momin" />
            <h4>Sani Momin</h4>
            <p>Founder</p>
          </div>
          <div className="AboutUR-team-member">
            <img src="/images/AboutImg5.jpg" alt="Musa Momin" />
            <h4>Musa Momin</h4>
            <p>Founder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUR;

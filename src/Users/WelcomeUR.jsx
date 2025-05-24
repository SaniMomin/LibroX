import React from "react";
import { useNavigate } from "react-router-dom";
import "../UserSide_CSS(Files)/WelcomeUR.css"; // Make sure to create this CSS file
import WelcomeNavbar from "./WelcomeNavbar";

const WelcomeUR = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <WelcomeNavbar />
      </div>
      <div className="WelcomeUR-wrapper">
        <section className="WelcomeUR-sectionOne">
          <h1>Welcome to Librox</h1>
          <p>Discover, Read, and Share your favorite books!</p>
        </section>

        <section className="WelcomeUR-sectionSecond">
          <h2>About Librox</h2>
          <p>
            Welcome to <strong>LibroX</strong>, your one-stop platform for
            reading and listening to books online. We offer a wide collection of
            books to suit every reader. Enjoy seamless access anytime, anywhere,
            and get physical books delivered across Maharashtra.
          </p>
        </section>

        <section className="WelcomeUR-sectionThird">
          <h2>Key Features</h2>
          <div className="WelcomeUR-featuresList">
            <div className="WelcomeUR-feature">📚 1000+ Books</div>
            <div className="WelcomeUR-feature">🎧 Audiobooks</div>
            <div className="WelcomeUR-feature">🚚 Fast Delivery</div>
            <div className="WelcomeUR-feature">🌐 Online Reading</div>
          </div>
        </section>

        <section className="WelcomeUR-sectionFour">
          <h2>Top Books</h2>
          <div className="WelcomeUR-bookList">
            <div className="WelcomeUR-book">
              <img
                src="https://media.shortform.com/covers/png/atomic-habits-cover@8x.png"
                alt="Book 1"
              />
              <h3>Atomic Habits</h3>
              <h4>By James Clear</h4>
              <p>⭐️⭐️⭐️⭐️☆</p>
            </div>
            <div className="WelcomeUR-book">
              <img
                src="https://tse1.mm.bing.net/th?id=OIP.-BCwa3l3ypgqeCfle1u85gHaLA&pid=Api&P=0&h=180"
                alt="Book 2"
              />
              <h3>Roald Dahl MATILDA</h3>
              <h4>By Quentin Blake</h4>
              <p>⭐️⭐️⭐️⭐️⭐️</p>
            </div>
            <div className="WelcomeUR-book">
              <img
                src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg"
                alt="Book 3"
              />
              <h3>The Alchemist</h3>
              <h4>By Paulo Coelho</h4>
              <p>⭐️⭐️⭐️⭐️☆</p>
            </div>
          </div>
        </section>

        <section className="WelcomeUR-sectionFive">
          <h2>What Our Readers Say</h2>
          <div className="WelcomeUR-testimonialList">
            <div className="WelcomeUR-testimonial">
              <p>"Librox has changed how I read! Amazing selection."</p>
              <span>- Asha M.</span>
            </div>
            <div className="WelcomeUR-testimonial">
              <p>"Great service, fast delivery, and helpful community."</p>
              <span>- Rahul D.</span>
            </div>
          </div>
        </section>

        <footer className="WelcomeUR-footer">
          <p>&copy; 2025 LibroX. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default WelcomeUR;

import { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";

function Home() {
  useEffect(() => {
    const carouselElement = document.querySelector('.carousel');
    if (carouselElement) {
      carouselElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <div className="homed">
        <div id='hom'>
          <h1>Home</h1>
          <p>This is the home page.</p>
          <button id='check-btn' type='button'>Check Events</button>
        </div>
        <div className="carousel" id='hom'>
          <p>carousel coming here</p>
        </div>
      </div>
      <footer>
        <div className="footer-content">
          <div className="contact-info">
            <h2>Contact Us</h2>
            <p><FontAwesomeIcon icon={faEnvelope} size="2x" color="rgb(135, 107, 43)" /> example@example.com</p>
            <p><FontAwesomeIcon icon={faPhone} size="2x" color="rgb(135, 107, 43)" /> +1234567890</p>
          </div>
          <div className='social' >
            <h3>Follow Us</h3>
            <div className="social-media">
              <div>
                <a href="#">
                  <FontAwesomeIcon icon={faFacebook} size='2x' />
                </a>
              </div>
              <div>
                <a href="#">
                  <FontAwesomeIcon icon={faTwitter} size='2x' />
                </a>
              </div>
              <div>
                <a href="#">
                  <FontAwesomeIcon icon={faLinkedinIn} size='2x' />
                </a>
              </div>
              <div>
                <a href="#">
                  <FontAwesomeIcon icon={faInstagram} size='2x' />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2024 Ticket Nexus. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;

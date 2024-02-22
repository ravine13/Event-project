import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";
import eventPageImage from "../assets/event-page-1.jpg"
import '../App.css'

function Home() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5555/events")
      .then((response) => response.json())
      .then((data) => {setEvents(data);
        const intervalId = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
        }, 10000); 
        return () => clearInterval(intervalId);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const carouselElement = document.querySelector('.carousel');
    if (carouselElement) {
      carouselElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const carouselEvents = events.map((event) => ({
    id: event.id,
    imageUrl: event.photo.url,
    eventName: event.name,
    startDate: event.start_date,
  }));

  return (
    <>
      <div className="homed">
        <div id='hom'>
          <h1 id='tck'>Ticket Nexus</h1>

          <img src={eventPageImage} alt='Event ticket'  style={{ width: '300px', height: 'auto' }}/>          
          <p>Elevating Events to Unforgettable Experiences</p>

          <button id='check-btn' type='button'>Check Events</button>
        </div>
        <div className="carousel" id='hom'>
          <h2>Upcoming  Event</h2>
          {carouselEvents.length > 0 && (
            <div id='current-card' style={{ maxwidth: '55%', margin: 'auto' }} >
              <img id="carous" src={carouselEvents[currentIndex].imageUrl} alt='Event'   style={{ width: '100%', height: '48vh' }} />
              <p> {carouselEvents[currentIndex].eventName}</p>
              {/* <p>Start Date: {carouselEvents[currentIndex].startDate}</p> */}
              
            </div>
          )}
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

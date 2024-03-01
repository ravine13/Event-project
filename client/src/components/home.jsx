import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./footer";
import "../App.css";

function Home() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5555/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        const intervalId = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
        }, 10000);
        return () => clearInterval(intervalId);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const carouselElement = document.querySelector(".carousel");
    if (carouselElement) {
      carouselElement.scrollIntoView({ behavior: "smooth" });
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
      <section className="container">
        <div>
          <h1 className="section-heading">
            Discover Experiences Without Limits With
            <span style={{ color: '#6366F1' }}> Ticket Nexus</span>
          </h1>
          <p className="section-subheading">
            Elevating Events to unforgettable Experiences. Book your next event
            with us for unlimited experiences.
          </p>
          <div className="browse-events-button">
            <Link to={"/event"}>
              <button type="button">
                Browse Events
              </button>
            </Link>
          </div>
        </div>
        <div className="carousel-container">
          {carouselEvents.length > 0 && (
            <div>
              <img
                className="carousel-image"
                src={carouselEvents[currentIndex].imageUrl}
                alt="Event"
              />
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;

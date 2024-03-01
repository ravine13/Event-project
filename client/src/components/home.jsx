import { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Footer from "./footer";

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
      <section style={{ marginTop: '8rem', marginBottom: '10rem', maxWidth: '72rem', paddingBottom: '1rem', paddingLeft: '1rem', paddingRight: '1rem', alignItems: 'center' }}>
        <div style={{ marginTop: '1rem', marginBottom: '1rem', flex: 1, textAlign: 'center' }}>
          <h1 style={{ color: '#1F2937', fontWeight: 'bold', fontSize: '2.25rem' }}>
            Discover Experiences Without Limits With
            <span style={{ color: '#6366F1' }}> Ticket Nexus</span>
          </h1>
          <p style={{ color: '#6B7280', maxWidth: '36rem', lineHeight: '1.5rem', marginLeft: 'auto', marginRight: 'auto' }}>
            Elevating Events to unforgettable Experiences. Book your next event
            with us for unlimited experiences.
          </p>
          <div>
            <div style={{ marginTop: '3rem', marginBottom: '1rem', marginLeft: '1.5rem', marginRight: '1.5rem', display: 'flex' }}>
              <Link to={"/event"}>
                <button
                  style={{ paddingLeft: '7rem', paddingRight: '7rem', paddingTop: '0.875rem', paddingBottom: '0.875rem', width: '100%', backgroundColor: '#6366F1', color: '#F9FAFB', borderRadius: '0.375rem', boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.07), 0 2px 4px 0 rgba(0, 0, 0, 0.06)' }}
                  type="button"
                >
                  Browse Events
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, marginTop: '1rem', textAlign: 'center' }}>
          {carouselEvents.length > 0 && (
            <div>
              <img
                style={{ borderRadius: '0.375rem', width: "100%", height: "48vh" }}
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

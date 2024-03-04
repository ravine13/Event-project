import { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Footer from "./footer";

function Home() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("https://event-project.onrender.com/events")
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
      <section className="mt-32 mb-40 mx-auto max-w-screen-xl pb-4 px-4 items-center lg:flex md:px-8">
        <div className="space-y-4 flex-1 sm:text-center lg:text-left">
          <h1 className="text-gray-800 font-bold text-4xl xl:text-5xl">
            Discover Experiences Without Limits With
            <span className="text-indigo-600"> Ticket Nexus</span>
          </h1>
          <p className="text-gray-500 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
            Elevating Events to unforgettable Experiences. Book your next event
            with us for unlimited experiences.
          </p>
          <div>
            <div className="mt-12 space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
              <Link to={"/event"}>
                <button
                  className="px-28 py-3.5 w-full bg-indigo-600 hover:bg-indigo-500 border-none text-white text-center rounded-md shadow-md block sm:w-auto"
                  type="button"
                >
                  Browse Events
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 text-center mt-4 lg:mt-0 lg:ml-3">
          {carouselEvents.length > 0 && (
            <div>
              <img
                className="rounded-lg"
                src={carouselEvents[currentIndex].imageUrl}
                alt="Event"
                style={{ width: "100%", height: "48vh" }}
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

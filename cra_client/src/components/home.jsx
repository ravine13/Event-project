import { useEffect, useState } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../App.css";
import { Link } from "react-router-dom";
import Footer from "./footer";

function Home() {
  const [events, setEvents] = useState([]);

  let spinners = (<div className='text-center p-4 m-4'>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
	</div>);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1
    }
  };

  useEffect(() => {
    fetch("https://event-project.onrender.com/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  let event_cards = events.map((event) => (
    <Link key={event.id} to={`/event/${event.id}`}>
      <div className="">
        <div className="">
          <img
            className="eventImage rounded"
            src={event.photo.url}
            alt={`${event.name}`}
          />
        </div>
      </div>
    </Link>
  ))

  const carouselEvents = events.map((event) => ({
    id: event.id,
    imageUrl: event.photo.url,
    eventName: event.name,
    startDate: event.start_date,
  }));

  return (
    <>
      <section className="mt-32 mb-40 mx-auto max-w-screen-xl pb-4 px-4 items-center">
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

        { events[0] === undefined ? spinners :
        <div className="flex-1 text-center mt-4 lg:mt-0 lg:ml-3">

          {carouselEvents.length > 0 && (
            <Carousel 
              responsive={responsive}
              showDots={true}
              ssr={true}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="all 1.5s linear 0.5s"
              removeArrowOnDeviceType={["tablet", "mobile"]}
            >
              {event_cards}
            </Carousel>
          )}
        </div>
        }

        
      </section>
      <Footer />
    </>
  );
}

export default Home;

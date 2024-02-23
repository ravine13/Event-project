import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Event() {
  const [events, setEvents] = useState([]);
 

  useEffect(() => {
    fetch("http://localhost:5555/events")
      .then((r) => r.json())
      .then((events) => setEvents(events))
      .catch((error) => console.error("Error fetching data:", error));

      
  }, []);
 

  return (
    <div>
      <div className="events">
        <div className="tiles">
          <div>
            <h4>Upcoming Events</h4>
          </div>
        </div>
        <div className="card-event">
          <div className="results">
            <div className="eventCard">
              {events.map((event) => (
                <Link key={event.id} to={`/event/${event.id}`}>
                  <div className="profile">
                    <img
                      className="eventImage"
                      src={event.photo.url}
                      alt={`${event.name}`}
                    />
                    <div className="eventInfo">
                      <h2>
                        <span> {event.name} </span><br/>
                        <span> {event.venue}</span>{" "}
                      </h2>
                      <p> start Date: {event.start_date} </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
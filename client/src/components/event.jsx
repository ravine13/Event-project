import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Event() {
  const [events, setEvents] = useState([]);
 

  console.log(events);

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
      <footer className="pageFooter">
        <div id="pagination">
          <h3>Pages</h3>
          <p>Privacy Policy</p>
          <p>Cookie Policy</p>
          <p>Terms and Conditions</p>
          <p>About</p>
        </div>
        <div id="pagination">
          <h3>Contact Us</h3>
          <p>3rd Floor, Lion Place, Westlands</p>
          <p>Ticketing Issues and General Queries <br/>
           <span>support@ticketnexus.com</span></p>
          <p>Event Listing <br/>
          <span>events@ticketnexus.com</span></p>
        </div>
        <div id="pagination">
          <h3>About</h3>
          <p>Our job is to ensure that your <br />
            brand is effectively EVENTED</p>
        </div>
      </footer>
    </div>
  );
}

export default Event;
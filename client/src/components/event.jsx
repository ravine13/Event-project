import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

function Event() {
  const [events, setEvents] = useState([]);
  const [genreFilter, setGenreFilter] = useState("All");
  const [searchFilter, setSearchFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  console.log(events);

  useEffect(() => {
    fetch("http://localhost:5555/events")
      .then((r) => r.json())
      .then((events) => setEvents(events))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredData =
    genreFilter === "All"
      ? events
      : events.filter((event) => event.genre === genreFilter);

  const filteredEvent = filteredData
    .filter((event) =>
      event.name.toLowerCase().includes(searchFilter.toLowerCase())
    )
    .filter((event) =>
      dateFilter ? event.date.toString() === dateFilter.toString() : true
    );

  return (
    <div>
      <div className="events">
        <div className="tiles">
          <div>
            <h4>Upcoming Events</h4>
          </div>
        </div>
        <div className="card-event">
          <div className="sidebar">
            <p id="app-name" className="nameed">
              <span></span>
            </p>
            <div className="search-bar">
              <div>
                <input
                  className="search"
                  placeholder="Enter event"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </div>
              <div className="searc con">
                <FontAwesomeIcon icon={faSearch} size="2x" color="#000000" />
              </div>
            </div>
            <div>
              <p className="nameed">Filter by Date:</p>
              <input
                type="number"
                placeholder="Enter Date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
            <p className="nameed">Sort by:</p>
            <label>
              <input
                className="rd-btn"
                name="options"
                value="All"
                checked={genreFilter === "All"}
                onChange={() => setGenreFilter("All")}
                type="radio"
              />
              All
            </label>
            <label>
              <input
                className="rd-btn"
                name="options"
                value="Male"
                checked={genreFilter === "Male"}
                onChange={() => setGenreFilter("Male")}
                type="radio"
              />
              Entertainment
            </label>
            <label>
              <input
                className="rd-btn"
                name="options"
                value="Female"
                checked={genreFilter === "Female"}
                onChange={() => setGenreFilter("Female")}
                type="radio"
              />
              Tech
            </label>
          </div>
          <div className="eventCard">
            {filteredEvent.map((event) => (
              <Link key={event.id} to={`/event/${event.id}`}>
                <div className="profile">
                  <img src={event.photo.url} alt={`${event.name}`} />
                  <h2>
                    <span> {event.name} </span>{" "}
                  </h2>
                  <h2>
                    <span> {event.venue} </span>{" "}
                  </h2>
                  <h3> Description: {event.description} </h3>
                  <h3> Duration: {event.duration} </h3>
                  <p> Start Time: {event.start_time} </p>
                  <p> start Date: {event.start_date} </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
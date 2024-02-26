import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5555/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  function handleClick(event) {
    setSelectedEvent(event);
  }

  return (
    <>
      <div className="dashboard">
        <div className="dashboardGlass">
          <div className="leftdiv">
            {events.map((event) => (
              <div key={event.id} onClick={() => handleClick(event)}>
                {event.name}
              </div>
            ))}
          </div>
          <div className="middlediv">
            {selectedEvent && (
              <div>
                <h2>{selectedEvent.name}</h2>
                <img src={selectedEvent.photo.url} />
                <p>{selectedEvent.description}</p>
                <p>{selectedEvent.venue}</p>
                <p>{selectedEvent.duration}</p>
              </div>
            )}
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;

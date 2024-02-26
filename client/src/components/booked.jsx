import { useState, useEffect } from "react";
import "../App.css";

function Booked() {
  const [BookedEvent, setBookedEvent] = useState([]);
 

  useEffect(() => {
    fetch("http://localhost:5555/bookings")
      .then((r) => r.json())
      .then((BookedEvents) => setBookedEvent(BookedEvents))
      .catch((error) => console.error("Error fetching data:", error));

      
  }, []);
 

  return (
    <div>
      <div className="events">
        <h3>Bookings</h3>
        
            <div className="bookingCard">
              {BookedEvent.map((booking) => (
                <div key={booking.id} to={`/bookings/${booking.id}`}>
                  <div className="profile">            
                    <div className="eventInfo">
                      <p><span> Event: {booking.name} </span></p>
                      <p> Start Date: {booking.start_date} </p>
                    </div>
                  </div>
                </div>
              ))}
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

export default Booked;
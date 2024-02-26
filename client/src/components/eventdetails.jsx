import { useState, useEffect } from "react";

import {
  useParams,
  NavLink,
  Link,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import Reviews from "./Reviews";
import Tags from "./Tags";
import ReviewSection from "./Reviews";

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [interestCount, setInterestCount] = useState(0);

  const handleInterestClick = () => {
    setInterestCount(interestCount + 1);
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 3000);
  };

  const [showBubble, setShowBubble] = useState(false);

  const [ticketQuantities, setTicketQuantities] = useState({
    regular: 0,
    vip: 0,
    vvip: 0,
    group: 0,
  });

  const navigate = useNavigate();
  const [pricing, setPricing] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5555/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => setEvent(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [eventId]);

  const handleBuyTicket = () => {
    console.log("Buy ticket button clicked");
  };

  const handleTicketQuantityChange = (ticketType, quantity) => {
    setTicketQuantities({ ...ticketQuantities, [ticketType]: quantity });
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    if (event) {
      totalAmount +=
        event.regular_price * ticketQuantities.regular +
        event.vip_price * ticketQuantities.vip +
        event.vvip_price * ticketQuantities.vvip +
        event.group_price * ticketQuantities.group;
    }
    return totalAmount;
  };

  return (
    <>
      <div className="event-bgd">
        {event && (
          <div className="event-details">
            <div className="single-event">
              <div className="event-image">
                <img
                  src={event.photo.url}
                  alt={`Image of ${event.event.name}`}
                />
              </div>
              <div>
                <h2>{event.event.name}</h2>
                <p>Venue: {event.event.venue}</p>
                <p>Description: {event.event.description}</p>
                <p>Duration: {event.event.duration}</p>
                <p>Start Time: {event.event.start_time}</p>
                <p>Start Date: {event.event.start_date}</p>

                <p>
                  Interested?{" "}
                  <FontAwesomeIcon
                    icon={faHeart}
                    size="1x"
                    color="rgb(135, 107, 43)"
                    onClick={handleInterestClick}
                  />
                </p>
                {showBubble && <div className="bubble">Interest declared!</div>}
                {/* Rest of the event details */}
              </div>
            </div>

            <div className="pricing">
              <h3>Pricing</h3>
              <table className="pricing-table">
                <thead>
                  <tr>
                    <th>Ticket Type</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Regular</td>
                    <td>{event.event.amount}</td>
                    <td>
                      <select
                        className="quantity-select"
                        value={ticketQuantities.regular}
                        onChange={(e) =>
                          handleTicketQuantityChange(
                            "regular",
                            parseInt(e.target.value)
                          )
                        }
                      >
                        {[...Array(10).keys()].map((quantity) => (
                          <option key={quantity} value={quantity}>
                            {quantity}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>VIP</td>
                    <td>{event.event.regular_price}</td>
                    <td>
                      <select
                        className="quantity-select"
                        value={ticketQuantities.vip}
                        onChange={(e) =>
                          handleTicketQuantityChange(
                            "vip",
                            parseInt(e.target.value)
                          )
                        }
                      >
                        {[...Array(10).keys()].map((quantity) => (
                          <option key={quantity} value={quantity}>
                            {quantity}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td>VVIP</td>
                    <td>{event.event.vvip_price}</td>
                    <td>
                      <select
                        className="quantity-select"
                        value={ticketQuantities.vvip}
                        onChange={(e) =>
                          handleTicketQuantityChange(
                            "vvip",
                            parseInt(e.target.value)
                          )
                        }
                      >
                        {[...Array(10).keys()].map((quantity) => (
                          <option key={quantity} value={quantity}>
                            {quantity}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Group</td>
                    <td>{event.event.group_price}</td>
                    <td>
                      <select
                        className="quantity-select"
                        value={ticketQuantities.group}
                        onChange={(e) =>
                          handleTicketQuantityChange(
                            "group",
                            parseInt(e.target.value)
                          )
                        }
                      >
                        {[...Array(10).keys()].map((quantity) => (
                          <option key={quantity} value={quantity}>
                            {quantity}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <p>Total Amount: {calculateTotalAmount()}</p>
              </div>
            </div>
            <button id="buy-ticket-btn" onClick={handleBuyTicket}>
              Buy Ticket
            </button>
            <div className="comments">
              <h4>
                Comments{" "}
                <FontAwesomeIcon
                  icon={faComment}
                  size="1x"
                  color="rgb(135, 107, 43)"
                />
              </h4>
              <div className="add-comment">
                <ReviewSection eventId={eventId} />
              </div>
            </div>
            <div className="tag-section">
              <h4>
                <NavLink to={`/event/${eventId}/tags`} exact>
                  {" "}
                  <p className="text-primary m-2">Tags</p>{" "}
                </NavLink>{" "}
              </h4>
            </div>
          </div>
        )}
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
          <p>
            Ticketing Issues and General Queries <br />
            <span>support@ticketnexus.com</span>
          </p>
          <p>
            Event Listing <br />
            <span>events@ticketnexus.com</span>
          </p>
        </div>
      </footer>
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
          <p>
            Ticketing Issues and General Queries <br />
            <span>support@ticketnexus.com</span>
          </p>
          <p>
            Event Listing <br />
            <span>events@ticketnexus.com</span>
          </p>
        </div>
        <div id="pagination">
          <h3>About</h3>
          <p>
            Our job is to ensure that your <br />
            brand is effectively EVENTED
          </p>
        </div>
      </footer>
    </>
  );
}

export default EventDetails;

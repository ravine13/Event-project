import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [ticketQuantities, setTicketQuantities] = useState({
    regular: 0,
    vip: 0,
    vvip: 0,
    group: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5555/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => setEvent(data))
      .catch((error) => console.error("Error fetching event details:", error));

    fetch(`http://localhost:5555/events/${eventId}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [eventId]);

  const handleCommentSubmit = () => {
    fetch(`http://localhost:5555/events/${eventId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newComment }),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([...comments, data]);
        setNewComment("");
      })
      .catch((error) => console.error("Error submitting comment:", error));
  };

  // Fetching booking data after button click (Buyticket)

  // const handleBooking = (bookingId) => {
  //   fetch(`http://localhost:5555/bookings/${bookingId}`)
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((error) =>
  //       console.error("Error fetching data from bookings:", error)
  //     );
  //   console.log(bookingId);
  // };

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
    <div>
      {event && (
        <div className="event-details">
          <h2>{event.name}</h2>
          <p>Venue: {event.venue}</p>
          <p>Description: {event.description}</p>
          <p>Duration: {event.duration}</p>
          <p>Start Time: {event.start_time}</p>
          <p>Start Date: {event.start_date}</p>
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
                  <td>{event.regular_price}</td>
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
                  <td>{event.vip_price}</td>
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
                  <td>{event.vvip_price}</td>
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
                  <td>{event.group_price}</td>
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
          <button
            id="buy-ticket-btn"
            onClick={() => {
              navigate(`/booking/${eventId}`, { replace: true });
            }}
          >
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
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>{comment.text}</li>
              ))}
            </ul>
            <div className="add-comment">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
              ></textarea>
              <button onClick={handleCommentSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDetails;

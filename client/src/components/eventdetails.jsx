import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  // const [bookings, setBookings] = useState([]);
  // const [reviews, setReviews] = useState([]);
  // const [newReview, setNewReview] = useState("");
  // const [photo, setPhoto] = useState(null);
  const [ticketQuantities, setTicketQuantities] = useState({
    regular: 0,
    vip: 0,
    vvip: 0,
    group: 0,
  });

  const navigate = useNavigate();
  // const [pricing, setPricing] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5555/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => setEvent(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [eventId]);

  // const fetchEventDetails = () => {
  //   fetch("http://localhost:5555/events/${eventId}")
  //     .then(data => {
  //       setEvent(data.event);
  //     })
  //     .catch(error => console.error("Error fetching event details:", error));
  // };

  // const fetchBookings = () => {
  //   fetch(`http://localhost:5555/events/${eventId}/bookings`)
  //     .then((response) => response.json())
  //     .then((data) => setBookings(data))
  //     .catch((error) => console.error("Error fetching bookings:", error));
  // };

  // const fetchReviews = () => {
  //   fetch(`http://localhost:5555/events/${eventId}/reviews`)
  //     .then((response) => response.json())
  //     .then((data) => setReviews(data))
  //     .catch((error) => console.error("Error fetching reviews:", error));
  // };

  // const fetchPricing = () => {
  //   fetch(`http://localhost:5555/pricing_list/${eventId}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Pricing data:", data);
  //       if (data.amount) {
  //         setPricing(data);
  //         setTicketQuantities((prevTicketQuantities) => ({
  //           ...prevTicketQuantities,
  //           regular: data.amount,
  //         }));
  //       } else {
  //         console.error("No pricing data found for this event");
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching pricing:", error));
  // };

  // const fetchPhoto = () => {
  //   fetch(`http://localhost:5555/photos/${eventId}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPhoto(data.photo);
  //     })
  //     .catch((error) => console.error("Error fetching photo:", error));
  // };

  // const handleReviewSubmit = () => {
  //   fetch(`http://localhost:5555/events/${eventId}/reviews`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ text: newReview }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setReviews([...reviews, data]);
  //       setNewReview("");
  //     })
  //     .catch((error) => console.error("Error submitting review:", error));
  // };
  const handleBuyTicket = () => {
    console.log("Buy ticket button clicked");
  };
  const handleBooking = (bookingId) => {
    fetch(`http://localhost:5555/bookings/${bookingId}`)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) =>
        console.error("Error fetching data from bookings:", error)
      );
    console.log(bookingId);
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
    <div>
    {event && (
    <div className="event-details">
    <div  className="single-event">
    <div className="event-image"><img src={event.photo.url} alt={`Image of ${event.event.name}`} /></div>
    <div>
      <h2>{event.event.name}</h2>
      <p>Venue: {event.event.venue}</p>
			<p>Description: {event.event.description}</p>
			<p>Duration: {event.event.duration}</p>
			<p>Start Time: {event.event.start_time}</p>
			<p>Start Date: {event.event.start_date}</p>
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
              <td>{event.event.regular_price}</td>
              <td>
                <select
                  className="quantity-select"
                  value={ticketQuantities.regular}
                  onChange={(e) =>
                    handleTicketQuantityChange(
                      "regular",
                      parseInt(e.target.value)
                    )
                  }>
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
				<td>{event.event.vip_price}</td>
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
            {/* <ul>
              {reviews.map((comment) => (
                <li key={comment.id}>{comment.text}</li>
              ))}
            </ul> */}
            <div className="add-comment">
              {/* <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Add a comment..."
              ></textarea> */}
              {/* <button onClick={handleReviewSubmit}>Submit</button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDetails;

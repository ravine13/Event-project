import { useState, useEffect } from "react";
import { useParams, NavLink, Link, Routes, Route} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Reviews from "./Reviews";
import Tags from "./Tags";
import ReviewSection from "./Reviews";
import "../App.css";
import Footer from "./footer";

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
      <div className="mt-32 mb-40 mx-auto max-w-screen-xl pb-4 px-4 items-center lg:flex md:px-8">
        {event && (
          <div className="">
            <div className="grid grid-cols-4 gap-0 mb-10">
              <div className="">
                <img
                  className="w-72 h-72"
                  src={event.photo.url}
                  alt={`Image of ${event.event.name}`}
                />
              </div>
              <div>
                <div className="mt-4 text-gray-900">
                  <h2 className="font-bold text-2xl mb-2">
                    {event.event.name}
                  </h2>
                  <p className="font-medium mb-1">Venue: {event.event.venue}</p>
                  <p className="font-medium mb-1">
                    Description: {event.event.description}
                  </p>
                  <p className="font-medium mb-1">
                    Duration: {event.event.duration}
                  </p>
                  <p className="font-medium mb-1">
                    Start Time: {event.event.start_time}
                  </p>
                  <p className="font-medium mb-1">
                    Start Date: {event.event.start_date}
                  </p>

                  <p className="font-medium mb-1">
                    Interested?{" "}
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="1x"
                      color="rgb(135, 107, 43)"
                      onClick={handleInterestClick}
                    />
                  </p>
                  {showBubble && (
                    <div className="bubble">Interest declared!</div>
                  )}
                  {/* Rest of the event details */}
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-2xl font-bold">Ticket Pricing</h3>
              <div className="mt-2 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                  <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                    <tr>
                      <th className="py-3 px-6">Ticket Type</th>
                      <th className="py-3 px-6">Price</th>
                      <th className="py-3 px-6">Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 divide-y">
                    <tr className="hover:bg-gray-200 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap font-semibold">
                        Regular
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {event.event.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          className="text-sm bg-transparent px-4 p-1 border rounded-sm h-full"
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

                    <tr className="hover:bg-gray-200 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap font-semibold">
                        VIP
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {event.event.regular_price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          className="text-sm bg-transparent px-4 p-1 border rounded-sm h-full"
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

                    <tr className="hover:bg-gray-200 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap font-semibold">
                        VVIP
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {event.event.vvip_price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          className="text-sm bg-transparent px-4 p-1 border rounded-sm h-full"
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

                    <tr className="hover:bg-gray-200 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap font-semibold">
                        Goup
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {event.event.group_price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          className="text-sm bg-transparent px-4 p-1 border rounded-sm h-full"
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
              </div>

              <div className="mt-10">
                <div className="grid grid-cols-4 gap-0">
                  <div>
                    <p>Total Amount: {calculateTotalAmount()}</p>
                  </div>
                  <div>
                    <Link to={"/booking"} style={{ textDecoration: "none" }}>
                      <button
                        className="px-8 py-2.5 w-full bg-indigo-600 hover:bg-indigo-500 border-none text-white text-center rounded-md shadow-md block sm:w-auto"
                        onClick={handleBuyTicket}
                      >
                        Book Ticket
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="comments">
              <div className="rev-section">
                <h4>
                  <NavLink to={`/event/${eventId}/reviews`} exact>
                    <h3 className="text-2xl font-bold">Event Reviews</h3>
                  </NavLink>{" "}
                </h4>

                <Routes>
                  <Route
                    path="/reviews/*"
                    element={<Reviews></Reviews>}
                    exact
                  ></Route>
                  <Route path="/tags/*" element={<Tags></Tags>} exact></Route>
                </Routes>
                <div className="add-comment">
                  <ReviewSection eventId={eventId} />
                </div>
              </div>
              <div className="tag-section">
                <h4>
                  <NavLink to={`/event/${eventId}/tags`} exact>
                    {" "}
                    <p className="text-xl font-medium">Tags</p>{" "}
                  </NavLink>{" "}
                </h4>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default EventDetails;

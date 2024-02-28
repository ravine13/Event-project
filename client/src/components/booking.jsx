<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Url = 'http://localhost:5555'; 

const Booking = () => {
    const [bookings, setBookings] = useState([]);
    const [newBooking, setNewBooking] = useState({ event_id: '', user_id: '', pricing_id: '' });

    useEffect(() => {
        axios.get(`${Url}/bookings`)
            .then(response => {
                setBookings(response.data);
            });
    }, []);

    const deleteBooking = (id) => {
        axios.delete(`${Url}/bookings/${id}`)
            .then(response => {
                setBookings(bookings.filter(booking => booking.id !== id));
            });
    };

    const createBooking = (booking) => {
        axios.post(`${Url}/new_booking`, booking)
            .then(response => {
                setBookings([...bookings, response.data]);
            });
    };

    const handleInputChange = (event) => {
        setNewBooking({ ...newBooking, [event.target.name]: event.target.value });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        createBooking(newBooking);
        setNewBooking({ event_id: '', user_id: '', pricing_id: '' });
    };

    return (
        <div>
            <h1>Bookings</h1>
            {bookings.map(booking => (
                <div key={booking.id}>
                    <h2>{booking.event_id}</h2>
                    <p>{booking.user_id}</p>
                    <p>{booking.pricing_id}</p>
                    <button onClick={() => deleteBooking(booking.id)}>Delete</button>
                </div>
            ))}
            <form onSubmit={handleFormSubmit}>
                <label>
                    Event ID:
                    <input type="text" name="event_id" value={newBooking.event_id} onChange={handleInputChange} required />
                </label>
                <label>
                    User ID:
                    <input type="text" name="user_id" value={newBooking.user_id} onChange={handleInputChange} required />
                </label>
                <label>
                    Pricing ID:
                    <input type="text" name="pricing_id" value={newBooking.pricing_id} onChange={handleInputChange} required />
                </label>
                <button type="submit">Create Booking</button>
            </form>
        </div>
    );
=======
import { useState } from "react";
import '../App.css';

const Booking = () => {
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvvNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBookingDetails = () => {
    fetch("http://127.0.0.1:5555/new_booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="font-[sans-serif] p-4 min-h-screen">
      <div className="lg:max-w-6xl max-w-xl mx-auto">
        <div className="lg:col-span-2 max-lg:order-1">
          <h2 className="text-3xl font-extrabold text-gray-100">
            Book for the event
          </h2>
          <p className="text-gray-100 text-base mt-6">
            Complete your transaction swiftly and securely with our easy-to-use
            payment process.
          </p>
          <form className="mt-12 max-w-lg">
            <div className="grid gap-6">
              <input
                type="text"
                name="cardName"
                placeholder="Cardholder's Name"
                className="px-4 py-3.5 bg-gray-100 text-gray-900 w-full text-sm border rounded-md outline-none"
                value={formData.cardName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                className="px-4 py-3.5 bg-gray-100 text-gray-900 w-full text-sm border rounded-md outline-none"
                value={formData.cardNumber}
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-6">
                <input
                  type="text"
                  name="expDate"
                  placeholder="EXP."
                  className="px-4 py-3.5 bg-gray-100 text-gray-900 w-full text-sm border rounded-md outline-none"
                  value={formData.expDate}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="cvvNumber"
                  placeholder="CVV"
                  className="px-4 py-3.5 bg-gray-100 text-gray-900 w-full text-sm border rounded-md outline-none"
                  value={formData.cvvNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="button"
              className="mt-6 w-40 py-3.5 text-sm bg-gray-900 text-white rounded-md"
              onClick={handleBookingDetails}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
>>>>>>> 643eae6fae0cee1bc0c9cf3c63287a1953312928
};

export default Booking;

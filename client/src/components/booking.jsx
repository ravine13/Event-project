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
};

export default Booking;

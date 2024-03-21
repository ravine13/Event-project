import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Url = 'https://event-project.onrender.com'; 

const AdvertFees = () => {
    const [advertFees, setAdvertFees] = useState([]);
    const [newAdvertFee, setNewAdvertFee] = useState({ user_id: '', amount: '', event_id: '' });

    useEffect(() => {
        axios.get(`${Url}/advert_fees`)
            .then(response => {
                setAdvertFees(response.data);
            });
    }, []);

    const deleteAdvertFee = (id) => {
        axios.delete(`${Url}/advert_fees/${id}`)
            .then(response => {
                setAdvertFees(advertFees.filter(advertFee => advertFee.id !== id));
            });
    };

    const createAdvertFee = (advertFee) => {
        axios.post(`${Url}/new_advert_fee`, advertFee)
            .then(response => {
                setAdvertFees([...advertFees, response.data]);
            });
    };

    const handleInputChange = (event) => {
        setNewAdvertFee({ ...newAdvertFee, [event.target.name]: event.target.value });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        createAdvertFee(newAdvertFee);
        setNewAdvertFee({ user_id: '', amount: '', event_id: '' });
    };

    return (
        <div>
            <h1>Advert Fees</h1>
            {advertFees.map(advertFee => (
                <div key={advertFee.id}>
                    <h2>{advertFee.user_id}</h2>
                    <p>{advertFee.amount}</p>
                    <p>{advertFee.event_id}</p>
                    <button onClick={() => deleteAdvertFee(advertFee.id)}>Delete</button>
                </div>
            ))}
            <form onSubmit={handleFormSubmit}>
                <label>
                    User ID:
                    <input type="text" name="user_id" value={newAdvertFee.user_id} onChange={handleInputChange} required />
                </label>
                <label>
                    Amount:
                    <input type="number" name="amount" value={newAdvertFee.amount} onChange={handleInputChange} required />
                </label>
                <label>
                    Event ID:
                    <input type="text" name="event_id" value={newAdvertFee.event_id} onChange={handleInputChange} required />
                </label>
                <button type="submit">Create Advert Fee</button>
            </form>
        </div>
    );
};

export default AdvertFees;
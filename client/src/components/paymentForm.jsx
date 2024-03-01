import React, { useState } from 'react';

const PaymentForm = ({ phoneNumber, setPhoneNumber, handleSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handlePaymentSubmit = () => {
    if (!phoneNumber) {
      setMessage('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    setMessage('');

    console.log('Sending request with phone number:', phoneNumber);

    
    fetch('http://127.0.0.1:5555/api/make_payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setMessage('Payment successful!');
        handleSubmit(); 
      })
      .catch((error) => {
        setIsLoading(false);
        setMessage('Payment failed. Please try again.');
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Make Payment</h2>
      <label>
        Phone Number:
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          required
        />
      </label>
      <button type="button" disabled={isLoading} onClick={handlePaymentSubmit}>
        {isLoading ? 'Processing...' : 'Make Payment'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PaymentForm;

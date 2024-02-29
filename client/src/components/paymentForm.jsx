import { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5555/make_payment', { number: phoneNumber });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred while processing the payment.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Make Payment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Make Payment'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PaymentForm;

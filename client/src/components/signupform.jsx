import { useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { registerUser } from '../services/api';

const SignupForm = ({ onBackToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    city: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(formData);
      console.log('response:', response);

      if (response && response.data) {
        console.log('User registered:', response.data);
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Registration failed:', error.response.data);
    }
  };

  return (
    <div className="signup-form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
      <label htmlFor="username">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label>Role:</label>
        <div>
            <input type="radio"  id="organizer" name="organizer" checked={formData.role === 'Organizer'} onChange={handleChange} />
            <label htmlFor="organizer">Organizer</label>

            <input type="radio" id="attendee" name="attendee" checked={formData.role === 'Attendee'} onChange={handleChange} />
            <label htmlFor="attendee">Attendee</label>
          </div>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

        
        <button type="submit">Sign Up</button>
        <button type="button" onClick={onBackToLogin}>Back to Login</button>
      </form>
    </div>
  );
};

SignupForm.propTypes = {
  onBackToLogin: PropTypes.func.isRequired,
};

export default SignupForm;
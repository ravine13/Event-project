
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ReviewSection({ eventId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');



  useEffect(() => {
    fetchReviews();
  }, [eventId]); 

  const fetchReviews = () => {
    fetch(`http://localhost:5555/events/${eventId}/reviews`)
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5555/events/${eventId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newReview }),
    })
      .then(response => response.json())
      .then(data => {
        setReviews([...reviews, data]);
        setNewReview('');
      })
      .catch(error => console.error('Error submitting review:', error));
  };

  return (
    <div>
	
      {reviews.map(review => (
        <div key={review.id}>{review.text}</div>
      ))}
      
	<form onSubmit={handleSubmit}>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Enter your review"
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

ReviewSection.propTypes = {
	eventId: PropTypes.string.isRequired,

};

export default ReviewSection;
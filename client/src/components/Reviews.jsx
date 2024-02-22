import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Reviews() {
	const [reviews, setReviews] = useState([]);
	const { eventId } = useParams();
	const [newReview, setNewReview] = useState("");

	let spinners = (<div className='text-center p-4 m-4'>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
	</div>);

	// READ
	useEffect(() => {
		fetch(`http://localhost:5555/events/${eventId}`)
		.then(response => response.json())
		.then(data => {
			setReviews(data.reviews);
		})
	}, [eventId])

	// CREATE
	function handleReviewSubmit(e){
		e.preventDefault();

		fetch(`http://localhost:5555/new_review`, {
      		method: "POST",
      		headers: {
        		"Content-Type": "application/json",
      			},
      		body: JSON.stringify({ 'comment': newReview, 'event_id' : eventId }),
    	})
      .then((response) => response.json())
      .then((data) => {
        setReviews(current => [...current, data]);
        setNewReview("");
      })
      .catch((error) => console.error("Error submitting review:", error));
  	};

	// DELETE
	function handleReviewDelete(review_id){
		if (window.confirm('Confirm Delete!')){
			fetch(`http://localhost:5555/reviews/${review_id}`, {
				method: 'DELETE'
			})
			.then(response => response.json())
			.then(() => {
				let filtered_reviews = reviews.filter((review) => review.id !== review_id );
				setReviews(filtered_reviews);
			})
		} else {
			alert('Action Aborted!')
		}
	}

	let review_cards = reviews.map((review) => {
			return (
				<div>
					<div>
						<p className='text-white d-inline'>{review.comment}</p>
						<button className='border-0'>
							<img src="https://cdn-icons-png.flaticon.com/128/860/860814.png" alt="NA" width={25} />
						</button>
						<button className='delete-btn border-0' onClick={() => handleReviewDelete(review.id)}>
							<img src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png" alt="NA" width={25} />
						</button>
					</div>
				</div>
			)
		})

  	return (
		<div>
			{reviews[0] !== undefined ? review_cards : spinners}
			<form action="" onSubmit={handleReviewSubmit}>
				<textarea 
				className='bg-white text-black'
				name="" 
				id="" 
				cols="60" 
				rows="2"
				onChange={(e) => setNewReview(e.target.value)}
				></textarea>
				<button className='border-0' type='submit'>
					<img src="https://cdn-icons-png.flaticon.com/128/10337/10337579.png" alt="NA" width={30}/>
				</button>
			</form>
		</div>
  	);
};

export default Reviews;
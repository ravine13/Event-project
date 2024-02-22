import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Reviews() {
	const [reviews, setReviews] = useState([]);
	const { eventId } = useParams();
	let spinners = (<div className='text-center p-4 m-4'>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
	</div>);

	useEffect(() => {
		fetch(`http://localhost:5555/events/${eventId}`)
		.then(response => response.json())
		.then(data => {
			setReviews(data.reviews);
			console.log(data.reviews);
		})
	}, [eventId])

	let review_cards = reviews.map((review) => {
			return (
				<div>
					<p className='text-white'>{review.comment}</p>
				</div>
			)
		})

  	return (
		<div>
			{reviews[0] !== undefined ? review_cards : spinners}
			<form action="">
				<textarea className='bg-white text-black' name="" id="" cols="60" rows="2"></textarea>
			</form>
		</div>
  	);
};

export default Reviews;
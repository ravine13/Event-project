import { useEffect, useState } from 'react';
import { Routes, Route, useParams, NavLink } from 'react-router-dom';

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

	useEffect(() => {
		fetch(`http://localhost:5555/events/${eventId}`)
		.then(response => response.json())
		.then(data => {
			setReviews(data.reviews);
		})
	}, [eventId])

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
}

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
		}}

	// UPDATE
	function handleUpdate(review_id){
		fetch(`http://localhost:5555/reviews/${review_id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ 'comment': newReview }),
		})
		.then(response => response.json())
		.then((data) => {
			console.log(data);
			let updatedReviews = reviews.map((review) => {
				if (review.id === review_id){
					return data
				} else {
					return review
				}
			})
			setReviews(updatedReviews);
		})
	}

	let review_cards = reviews.map((review) => {
			return (
			<div  key={review.id}>
					<div>
						<p className='text-white d-inline'>{review.comment}</p>
						<NavLink to={`/event/${eventId}/reviews/edit`} exact>
							<img src="https://cdn-icons-png.flaticon.com/128/860/860814.png" alt="NA" width={25} />
						</NavLink>
						<button className='delete-btn border-0' onClick={() => handleReviewDelete(review.id)}>
							<img src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png" alt="NA" width={25} />
						</button>
					</div>
					<Routes>
						<Route path='/edit' element={
						<div>
							<textarea 
								className='bg-white text-black'
								name="" 
								id="" 
								cols="60" 
								rows="1"
								placeholder={review.comment}
								onChange={(e) => setNewReview(e.target.value)}
							></textarea>
								{/* <input className='bg-white text-primary' type="text" placeholder={review.comment}/> */}
								<button onClick={() => {handleUpdate(review.id)}}>
									<img src="https://cdn-icons-png.flaticon.com/128/1828/1828640.png" alt="NA" width={30}/>
								</button>
						</div>
						} exact></Route>
					</Routes>
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
	}

export default Reviews;
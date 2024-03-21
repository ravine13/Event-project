import { useEffect, useState } from "react";
import { Routes, Route, useParams, NavLink } from "react-router-dom";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { eventId } = useParams();
  const [newReview, setNewReview] = useState("");

  //   let spinners = (
  //     <div className="text-center p-4 m-4">
  //       <div className="spinner-border text-primary mx-2"></div>
  //       <div className="spinner-grow text-primary mx-2"></div>
  //       <div className="spinner-border text-primary mx-2"></div>
  //       <div className="spinner-grow text-primary mx-2"></div>
  //       <div className="spinner-border text-primary mx-2"></div>
  //       <div className="spinner-grow text-primary mx-2"></div>
  //     </div>
  //   );

  //   useEffect(() => {
  //     fetch(`https://event-project.onrender.com/events/${eventId}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setReviews(data.reviews);
  //       });
  //   }, [eventId]);

  //   function handleReviewSubmit(e) {
  //     e.preventDefault();

  //     fetch(`https://event-project.onrender.com/new_review`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ comment: newReview, event_id: eventId }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setReviews((current) => [...current, data]);
  //         setNewReview("");
  //       })
  //       .catch((error) => console.error("Error submitting review:", error));
  //   }

  //   function handleReviewDelete(review_id) {
  //     if (window.confirm("Confirm Delete!")) {
  //       fetch(`https://event-project.onrender.com/reviews/${review_id}`, {
  //         method: "DELETE",
  //       })
  //         .then((response) => response.json())
  //         .then(() => {
  //           let filtered_reviews = reviews.filter(
  //             (review) => review.id !== review_id
  //           );
  //           setReviews(filtered_reviews);
  //         });
  //     } else {
  //       alert("Action Aborted!");
  //     }
  //   }

  //   function handleUpdate(review_id) {
  //     fetch(`https://event-project.onrender.com/reviews/${review_id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ comment: newReview }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         let updatedReviews = reviews.map((review) => {
  //           if (review.id === review_id) {
  //             return data;
  //           } else {
  //             return review;
  //           }
  //         });
  //         setReviews(updatedReviews);
  //       });
  //   }

  //   let review_cards = reviews.map((review) => {
  //     return (
  //       <div key={review.id}>
  //         <Routes>
  //           <Route
  //             path="/edit"
  //             element={
  //               <div>
  //                 <textarea
  //                   className='className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
  //                   name=""
  //                   id=""
  //                   cols="60"
  //                   rows="1"
  //                   placeholder={review.comment}
  //                   onChange={(e) => setNewReview(e.target.value)}
  //                 ></textarea>
  //                 {/* <input className='bg-white text-primary' type="text" placeholder={review.comment}/> */}
  //                 <button
  //                   onClick={() => {
  //                     handleUpdate(review.id);
  //                   }}
  //                 >
  //                   <img
  //                     src="https://cdn-icons-png.flaticon.com/128/1828/1828640.png"
  //                     alt="NA"
  //                     width={30}
  //                   />
  //                 </button>
  //               </div>
  //             }
  //             exact
  //           ></Route>
  //         </Routes>
  //         <div>
  //           <p className="text-white d-inline">{review.comment}</p>
  //           <NavLink to={`/event/${eventId}/reviews/edit`} exact>
  //             <img
  //               src="https://cdn-icons-png.flaticon.com/128/860/860814.png"
  //               alt="NA"
  //               width={25}
  //             />
  //           </NavLink>
  //           <button
  //             className="delete-btn border-0"
  //             onClick={() => handleReviewDelete(review.id)}
  //           >
  //             <img
  //               src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png"
  //               alt="NA"
  //               width={25}
  //             />
  //           </button>
  //         </div>
  //       </div>
  //     );
  //   });

  return (
    <div>
      <form action="">
        <textarea
          className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          name=""
          id=""
          cols="60"
          rows="2"
          placeholder="Add Comment"
          onChange={(e) => setNewReview(e.target.value)}
        ></textarea>
        <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
          Comment
        </button>
      </form>
    </div>
  );
}

export default Reviews;
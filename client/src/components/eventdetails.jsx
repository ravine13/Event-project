import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5555/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => setEvent(data))
      .catch((error) => console.error("Error fetching event details:", error));

    
    fetch(`http://localhost:5555/events/${eventId}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [eventId]);

  const handleCommentSubmit = () => {
    fetch(`http://localhost:5555/events/${eventId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newComment }),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([...comments, data]);
        setNewComment(""); 
      })
      .catch((error) => console.error("Error submitting comment:", error));
  };

  return (
    <div>
      {event && (
        <div className="event-details">
          <h2>{event.name}</h2>
          <p>Venue: {event.venue}</p>
          <p>Description: {event.description}</p>
          <p>Duration: {event.duration}</p>
          <p>Start Time: {event.start_time}</p>
          <p>Start Date: {event.start_date}</p>
          <div className="comments">
            <h3>Comments <FontAwesomeIcon icon={faComment} size="2x" color="rgb(135, 107, 43)"/></h3>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>{comment.text}</li>
              ))}
            </ul>
            <div className="add-comment">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
              ></textarea>
              <button onClick={handleCommentSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDetails;
import { useState, useEffect } from "react";
// import './DashBoards/Dashboard.css';
// import axios from "axios";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:5555/events")
  //     .then((response) => {
  //       setEvents(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching events:", error);
  //     });
  // }, []);

  // function handleClick(event) {
  //   setSelectedEvent(event);
  // }

  return (
    <>
      {/* <div className="dashboard">
        <div className="dashboardGlass">
          <div className="leftdiv">
            {events.map((event) => (
              <div key={event.id} onClick={() => handleClick(event)}>
                {event.name}
              </div>
            ))}
          </div>
          <div className="middlediv">
            {selectedEvent && (
              <div>
                <h2>{selectedEvent.name}</h2>
                <img src={selectedEvent.photo.url} />
                <p>{selectedEvent.description}</p>
                <p>{selectedEvent.venue}</p>
                <p>{selectedEvent.duration}</p>
              </div>
            )}
          </div>
          <div></div>
        </div>
      </div> */}
    </>
  );
}

export default AdminDashboard;

// Draft
//   const [userProfile, setUserProfile] = useState({
//     id: "",
//     first_name: "",
//     last_name: "",
//     profile_photo: "",
//   });
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     axios
//       .get(`http://127.0.0.1:5555/profile`)
//       .then((response) => response.json())
//       .then((data) => {
//         setUserProfile(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching user profile", error);
//         setLoading(false);
//       });
//   }, []);
//   function handleProfileUpdate(updatedProfileInfo) {
//     axios
//       .patch(`http://127.0.0.1:5555/profile/${user_id}`, updatedProfileInfo)
//       .then((response) => response.json())
//       .then((data) => {
//         setUserProfile((previousInfo) => ({
//           ...previousInfo,
//           ...updatedProfileInfo,
//         }));
//       })
//       .catch((error) => {
//         console.error("Error updating profile:", error);
//       });
//   }
//   function handleProfilePhotoChange(event) {
//     const file = event.target.files[0];
//     const formData = new FormData();
//     formData.append("profile_photo", file);
//     axios
//       .patch(`http://127.0.0.1:5555/profile/${user_id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((response) => {
//         console.log("Profile photo updated successfully:", response.data);
//         setUserProfile((previousInfo) => ({
//           ...previousInfo,
//           profile_photo: response.data.profile_photo,
//         }));
//       })
//       .catch((error) => {
//         console.error("Error updating profile photo:", error);
//       });
//   }
//   function handleProfileDelete() {
//     axios
//       .delete(`http://127.0.0.1:5555/profile/${user_id}`)
//       .then((response) => {
//         console.log("Profile deleted successfully", response.data);
//         // logic to return to the log in page
//       })
//       .catch((error) => {
//         console.error("Error deleting profile:", error);
//       });

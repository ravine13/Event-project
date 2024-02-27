import React, { useState, useEffect } from "react";
import axios from "axios";

function UserDashboard() {
  const [userProfile, setUserProfile] = useState({
    id: "",
    first_name: "",
    last_name: "",
    profile_photo: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5555/profile`)
      .then((response) => response.json())
      .then((data) => {
        setUserProfile(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user profile", error);
        setLoading(false);
      });
  }, []);

  function handleProfileUpdate(updatedProfileInfo) {
    axios
      .patch(`http://127.0.0.1:5555/profile/${user_id}`, updatedProfileInfo)
      .then((response) => response.json())
      .then((data) => {
        setUserProfile((previousInfo) => ({
          ...previousInfo,
          ...updatedProfileInfo,
        }));
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  }

  function handleProfilePhotoChange(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("profile_photo", file);

    axios
      .patch(`http://127.0.0.1:5555/profile/${user_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Profile photo updated successfully:", response.data);
        setUserProfile((previousInfo) => ({
          ...previousInfo,
          profile_photo: response.data.profile_photo,
        }));
      })
      .catch((error) => {
        console.error("Error updating profile photo:", error);
      });
  }

  function handleProfileDelete() {
    axios
      .delete(`http://127.0.0.1:5555/profile/${user_id}`)
      .then((response) => {
        console.log("Profile deleted successfully", response.data);

        // logic to return to the log in page
      })
      .catch((error) => {
        console.error("Error deleting profile:", error);
      });
  }
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>User Dashboard</h1>
          <div>
            <h2>Profile</h2>
            <p>
              Name: {userProfile.first_name} {userProfile.last_name}
            </p>
            <img src={userProfile.profile_photo} alt="Profile" />
            <input type="file" onChange={handleProfilePhotoChange} />
            <button onClick={handleProfileDelete}>Delete Profile</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;

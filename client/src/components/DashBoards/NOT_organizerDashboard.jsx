import React, { useState, useEffect } from "react";
import axios from "axios";

const Organizer = () => {
  const [organizerProfile, setOrganizerProfile] = useState(null);
  const [updatedProfileData, setUpdatedProfileData] = useState({
    first_name: "",
    last_name: "",
    profile_photo: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get("/profile/organizerId")
      .then((response) => {
        setOrganizerProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching organizer profile:", error);
      });
  }, []);

  const updateProfile = () => {
    axios
      .patch(`/profile/${organizerProfile.id}`, updatedProfileData)
      .then((response) => {
        console.log("Profile updated:", response.data.message);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div>
      {organizerProfile ? (
        <>
          <h2>Organizer Profile</h2>
          {isEditing ? (
            <>
              <label>First Name:</label>
              <input
                type="text"
                value={updatedProfileData.first_name}
                onChange={(e) =>
                  setUpdatedProfileData({
                    ...updatedProfileData,
                    first_name: e.target.value,
                  })
                }
              />
              <label>Last Name:</label>
              <input
                type="text"
                value={updatedProfileData.last_name}
                onChange={(e) =>
                  setUpdatedProfileData({
                    ...updatedProfileData,
                    last_name: e.target.value,
                  })
                }
              />
              <label>Profile Photo:</label>
              <input
                type="text"
                value={updatedProfileData.profile_photo}
                onChange={(e) =>
                  setUpdatedProfileData({
                    ...updatedProfileData,
                    profile_photo: e.target.value,
                  })
                }
              />
              <button onClick={updateProfile}>Save</button>
            </>
          ) : (
            <>
              <p>First Name: {organizerProfile.first_name}</p>
              <p>Last Name: {organizerProfile.last_name}</p>
              <p>Profile Photo: {organizerProfile.profile_photo}</p>
              <button onClick={() => setIsEditing(true)}>Edit</button>
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Organizer;

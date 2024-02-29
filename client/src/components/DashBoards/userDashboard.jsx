import React, { useState, useEffect } from "react";
import axios from "axios";

const User = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [updatedProfileData, setUpdatedProfileData] = useState({
    first_name: "",
    last_name: "",
    profile_photo: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get(`/profile/${userProfile}`)
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  const updateProfile = () => {
    axios
      .patch(`/profile/${userProfile.id}`, updatedProfileData)
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
      {userProfile ? (
        <>
          <h2>User Profile</h2>
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
              <p>First Name: {userProfile.first_name}</p>
              <p>Last Name: {userProfile.last_name}</p>
              <p>Profile Photo: {userProfile.profile_photo}</p>
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

export default User;

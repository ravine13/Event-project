import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { EventsContext } from "../../App";

const User = () => {
  const {user_id} = useContext(EventsContext)
  const [userProfile, setUserProfile] = useState(null);


  const getUserId = () => {
  
    return localStorage.getItem('user_id');
  };
  

  useEffect(() => {
    const userId = getUserId();
    if (userId) {
      axios
        .get(`http://127.0.0.1:5555/profile/${user_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}` 
          }
        })
        .then((response) => {
          setUserProfile(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, []);

  return (
    <div>
      {userProfile ? (
        <>
          <h2>User Profile</h2>
          <p>First Name: {userProfile.first_name}</p>
          <p>Last Name: {userProfile.last_name}</p>
          <p>Email: {userProfile.email}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default User;

import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { EventsContext } from "../../App";

const User = () => {
  const { user_id, token, token_exists } = useContext(EventsContext)
  const [userProfile, setUserProfile] = useState(null);

  let spinners = (<div className='text-center p-4 m-4'>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
	</div>);

  

  useEffect(() => {
    if (token_exists) {
        fetch(`http://127.0.0.1:5555/users/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}}`
          }
        })
        .then((response) => {
          return response.json();
        })
        .then(data => {
          if ( data ){
          fetch(`http://127.0.0.1:5555/profile/${data.profiles[0]}`)
          .then( response => response.json())
          .then( data => {
            setUserProfile(data);
            console.log(data);
          })
          }
        })
    }
  }, []);

  return (
    <div className="d-flex flex-column text-align-center justify-content-center">
      {userProfile ? (
        <>
          <h1>User Profile</h1>
          <h3>First Name: {userProfile.first_name}</h3>
          <p>Last Name: {userProfile.last_name}</p>
        </>
      ) : (
        spinners
      )}
    </div>
  );
};

export default User;
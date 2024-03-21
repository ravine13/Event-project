import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PasswordResetRequest() {
	let navigate = useNavigate();
	let [email, setEmail] = useState('');

	function handleSubmit(e){
		e.preventDefault()
		console.log(email);

		fetch('https://event-project.onrender.com/reset_password/request', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({'email': email})
		})
		.then(res => {
			if (res.ok){
				return(res.json())
			}
			else{
				console.log('Not Found');
			}
		})
		.then( data => {
			console.log(data);
			localStorage.setItem('password_reset', data.token)
			navigate('/password_reset/new_password')
		})
	}

	function handleInputChange(e){
		setEmail(e.target.value)
	}

	return (
		<div>
			<form className='text-center' onSubmit={handleSubmit}>
				<input className='text-white' type="email" onChange={handleInputChange} />
				<br /> <br />
				<input className='border rounded bg-primary text-white p-1' type="submit" value={'Send Request'} />
			</form>
		</div>
	)
}

export default PasswordResetRequest;
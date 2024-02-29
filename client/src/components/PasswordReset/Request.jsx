import React, { useState } from 'react'

function PasswordResetRequest() {
	let [email, setEmail] = useState('');

	function handleSubmit(e){
		e.preventDefault()
		console.log(email);

		fetch('http://127.0.0.1:5555/reset_password/request', {
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
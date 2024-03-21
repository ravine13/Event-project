import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewPassword() {
	let navigate = useNavigate()
	let [inputs, setInputs] = useState();
	let reset_token = localStorage.getItem('password_reset');

	function handleInputChange(e) {
		let name = e.target.name;
		let value = e.target.value;

		setInputs(current => ({...current, [name]: value}))
	}

	function handleSubmit(e){
		e.preventDefault()

		fetch('https://event-project.onrender.com/reset_password/verify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${reset_token}`,
			},
			body: JSON.stringify(inputs)
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			localStorage.removeItem('password_reset')
			navigate('/signin')
		})
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="new_password">New Password</label>
				<input type="password" id='new_password' className='d-block' onChange={handleInputChange} name='new_password'/> <br />
				{/* <label htmlFor="confirm_new_password">Confirm New Password</label> <br />
				<input type="password" className='d-block' onChange={handleInputChange} /> <br /> */}

				<input className='border rounded bg-primary text-white p-1' type="submit" value={'Submit'}/>
			</form>
		</div>
  	)
};

export default NewPassword;
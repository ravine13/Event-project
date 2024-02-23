import React, {useState, useEffect, useRef} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "../SignUp.css";

function SignUp() {
	const navigate = useNavigate();
	let [showPassword, setShowPassword] = useState(false);
	let [showConfirmPassword, setShowConfirmPassword] = useState(false);
	let [signUpData, setSignUpData] = useState({})

	let email_label = useRef();
	let password_label = useRef();
	let password_input = useRef();
	let confirmPasswordInput = useRef();
	let confirmPasswordLabel = useRef();

	function onInputChange(e){
		let name = e.target.name;
		let value = e.target.value;

		setSignUpData((current) => ({...current, [name]:value}))
	}

	// ON SUBMIT
	function onLogFormSubmit(e){
		e.preventDefault();
		e.target.reset();

		fetch("http://127.0.0.1:5555/register",{
			method: "POST",
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(signUpData)
		})
		.then(response => {
			if (response.ok){
				return(
				response.json()
				)
			}
			else{
				window.alert('Account already exits!')
				navigate('/signin')
			}
		})
		.then((data)=> {
			if(data){
				window.alert('Your account has been successfully created!')
				navigate('/authpage/signup')
			}else{
				navigate('/authpage/signup')
			}
		})
	}

	function onInputClick(){
		email_label.current.style.cssText = `transform: translate(-10%, -140%) scale(0.9); background-color: rgb(20, 0, 100); color: white; border-radius: 1000px;`;
		password_label.current.style.cssText = `transform: translate(-10%, -140%) scale(0.9); background-color: rgb(20, 0, 100); color: white; border-radius: 1000px;`;
		confirmPasswordLabel.current.style.cssText = `transform: translate(-10%, -140%) scale(0.9); background-color: rgb(20, 0, 100); color: white; border-radius: 1000px;`;
	}

	function toggle_show_password(){
		setShowPassword(current => !current);
		if (!showPassword) {
			password_input.current.type = 'text';
		}
		else{
			password_input.current.type = 'password';
		};
	}

	function toggleShowConfirmpassword(){
		setShowConfirmPassword(current => !current);
		if (!showConfirmPassword) {
			confirmPasswordInput.current.type = 'text';
		}
		else{
			confirmPasswordInput.current.type = 'password';
		};
	}

	// //
	return (
		<div className='account_div d-flex justify-content-center align-items-center my-3'>
			<form onSubmit={onLogFormSubmit} className='log_form d-flex flex-column justify-content-center align-items-center'>
				<div className='log_inputs_div mt-4 m-2'>
					<label ref={email_label} className='log_labels' htmlFor='log_email'>Email</label>
					<input type='text' className='bg-white text-black' id="log_email" name='email' onClick={onInputClick} onChange={onInputChange} required></input>
				</div>

				<div className='log_inputs_div password_div mt-4 m-2'>
					<label ref={password_label} className='log_labels' htmlFor='password'>Password</label>
					<input ref={password_input} type='password' className='bg-white text-black' id="password" name='password' onClick={onInputClick} onChange={onInputChange} required></input>
					<img src={ showPassword ? "https://cdn-icons-png.flaticon.com/128/6155/6155179.png" : "https://cdn-icons-png.flaticon.com/128/11502/11502610.png"} onClick={toggle_show_password} alt="NA"></img>
				</div>

				<div className='log_inputs_div password_div mt-4 m-2'>
					<label ref={confirmPasswordLabel} className='log_labels' htmlFor='confirm-password'>Confirm</label>
					<input ref={confirmPasswordInput} type='password' className='bg-white text-black' id="confirm-password" name='confirm-password' onClick={onInputClick} onChange={onInputChange} required></input>
					<img src={ showConfirmPassword ? "https://cdn-icons-png.flaticon.com/128/6155/6155179.png" : "https://cdn-icons-png.flaticon.com/128/11502/11502610.png"} onClick={toggleShowConfirmpassword} alt="NA"></img>
				</div>

				
                <select name="role" onChange={onInputChange}>
                    <option value={0}>Attendee</option>
                    <option value={1}>Organizer</option>
                </select>

				<div className='log_inputs_div mt-4 m-2'>
					<input type='submit' className='log_submit' value={'Sign Up'}></input>
				</div>

				<p className='log_p text-white'>
					Already have an account?<NavLink to={'/authpage/signup'} ><span>Login</span></NavLink>
				</p>
			</form>
    	</div>
	)
};

export default SignUp;
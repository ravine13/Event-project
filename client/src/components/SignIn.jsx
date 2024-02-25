import {useState, useRef, useContext} from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import "../SignUp.css";
import { EventsContext } from '../App';

export default function SignIn({ onSwitchToSignUp }) {
	const navigate = useNavigate();
	let { setSignedIn } = useContext(EventsContext)
	let [showPassword, setShowPassword] = useState(false);
	let [signInData, setSignInData] = useState({})

	let email_label = useRef();
	let password_label = useRef();
	let password_input = useRef();
	let logSubmit = useRef();

	function onInputClick(){
		email_label.current.style.cssText = `transform: translate(-10%, -140%) scale(0.9); background-color: rgb(20, 0, 100); color: white; border-radius: 1000px;`;
		password_label.current.style.cssText = `transform: translate(-10%, -140%) scale(0.9); background-color: rgb(20, 0, 100); color: white; border-radius: 1000px;`;
	}

	function onInputChange(e){
		let name = e.target.name;
		let value = e.target.value;

		setSignInData((current) => ({...current, [name]:value}))
	}

	function onLogFormSubmit(e){
		e.preventDefault();
		e.target.reset();

		fetch("http://127.0.0.1:5555/login",{
			method: "POST",
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(signInData)
		})
		.then(response => {
			if (response.ok){
				return(
				response.json()
				)
			}
			else{
				window.alert('No users found!')
			}
		})
		.then((data)=> {
			if(data){
				localStorage.setItem("user_auth_token", data.token)
				window.alert('Successfully Logged In')
				navigate("/dashboard")
				setSignedIn(true)
				console.log(data);
			}
		})
	}

	function toggle_show_password(){
		setShowPassword(current => !current);
		if (!showPassword) {
			password_input.current.type = 'text';
		}
		else{
			password_input.current.type = 'password';
		}
	}

	return (
		<div className='account_div d-flex justify-content-center align-items-center my-3'>
		<h3>SignIn</h3>
			<form onSubmit={onLogFormSubmit} className='log_form d-flex flex-column justify-content-center align-items-center'>				
				<div className='log_inputs_div mt-4 m-2'>
					<label ref={email_label} className='log_labels' htmlFor='log_email'>Email</label>
					<input type='text' id="log_email" className='bg-white text-black' name='email' onClick={onInputClick} onChange={onInputChange} required></input>
				</div>
				
				<div className='log_inputs_div password_div mt-4 m-2'>
					<label ref={password_label} className='log_labels' htmlFor='password'>Password</label>
					<input ref={password_input} type='password' id="password" className='bg-white text-black' name='password' onClick={onInputClick} onChange={onInputChange} required></input>
					<img src={ showPassword ? "https://cdn-icons-png.flaticon.com/128/6155/6155179.png" : "https://cdn-icons-png.flaticon.com/128/11502/11502610.png"} onClick={toggle_show_password} alt="NA"></img>
				</div>
				
				<div className='log_inputs_div mt-4 m-2'>
					<input ref={logSubmit} type='submit' className='log_submit' value={'Log In'}></input>
					<input onClick={onSwitchToSignUp} type='button' className='log_submit' value={'Sign Up'}></input>
				</div>

				<p className='log_p text-white'> Dont have an account? <NavLink to={'/SignUp'} ><span className='sign_span'>Sign Up</span></NavLink>
				</p>
			</form>
		</div>
	)
}

SignIn.propTypes = {
	onSwitchToSignUp: PropTypes.func.isRequired,
  };
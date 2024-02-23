import React, {useState} from "react";

function SignUp() {
	const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmed: "",
        role: "attendee"
    })

	function handleChange(event){
        const{name, value} = event.target;
        setFormData({
            ...formData,
            [name]:value
        })
    };

	function handleSubmit(e) {
		e.preventDefault();
		fetch('http://127.0.0.1:5555/new_user', {
			method : 'POST',
			headers : {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData)
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
		})
	}

	return (
		<div>
            <h2>Sign up Form</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="text" name = "email" value={formData.email} onChange={handleChange}/>
                </label>

                <br />

                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange}/>
                </label>

                <br />

                <label>
                    Confirmed
                    <input type="text" name="confirmed" value={formData.confirmPassword} onChange={handleChange} />
                </label>

                <br />

                <label>
                Role:
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value={100}>Attendee</option>
                    <option value={101}>Organizer</option>
                </select>
                </label>
                <br />

                <button type="submit">Sign Up</button>
            </form>
        
        </div>
	)
};

export default SignUp;
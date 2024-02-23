import {useState} from "react";

export default function SignupForm(){
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
    }

    const handleSubmit = async(event) =>{
        event.preventDefault();

        try{
            const response = await fetch ("http://127.0.0.1:5000/users",{
                method: "POST",
                headers:{
                    "Content-Type":"application/jsom",
                },
                body: JSON.stringify(formData),
            });

            if(!response.ok){
                throw new Error('Registration failed')
            }
            window.location.href = '/login'
            console.log('Registration Successful')
        }
        catch(error){
            console.error("error during registration", error.message);
        }
    };

    return(
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
                    Confirm Password:
                    <input type="password" name="confirmed" value={formData.confirmPassword} onChange={handleChange} />
                </label>

                <br />

                <label>
                Role:
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="attendee">Attendee</option>
                    <option value="organizer">Organizer</option>
                </select>
                </label>
                <br />

                <button type="submit">Sign Up</button>
            </form>
        
        </div>
    )
}
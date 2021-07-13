import axios from 'axios';
import React from 'react'

export default function Register() {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const handleSubmit = (e)=>{
        e.preventDefault();
        const newUser = {
            username:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
        };

        try{
            await axios.post("/users/register",newUser);
            setError(false);
            setSuccess(true);
        }catch(err){
            setError(true);
        }
    }

    return (
        <div>
            <div className="logo"></div>
            <form onSubmit={handleSubmit}>
                <input type="text" />
                <input type="email" />
                <input type="password" />
                <button>Register</button>
            </form>
        </div>
    )
}

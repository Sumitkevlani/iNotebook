import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from './Button.js';

const Login = (props) => {
    const {showAlert} = props;
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const host = "http://localhost:5000";
    const navigate = useNavigate();
    
    function handleEmailChange(e){
        setEmail(e.target.value);
    }
    function handlePasswordChange(e){
        setPassword(e.target.value);
    }
    async function handleSubmit(e){
        e.preventDefault();
        const url = `${host}/api/auth/loginUser/`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "mode": "cors",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password }),
        });
        if(response.ok){
            const json = await response.json();
            localStorage.setItem('token',json.authToken);
            showAlert("You have been logged in successfully", "success");
            navigate("/");
        }
        else{
            showAlert("Invalid credentials", "danger");
            navigate("/login");
        }
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control my-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleEmailChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control my-3" id="exampleInputPassword1" placeholder="Password" onChange={handlePasswordChange}/>
                </div>
                <button type="submit" className="btn btn-dark my-3">Submit</button>
            </form>
            <Button name="Google Signin"/>
            <Button name = "Facebook Signin" />
        </div>

    )
}

export default Login;

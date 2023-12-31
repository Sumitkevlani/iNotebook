import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const {showAlert} = props;
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const host = "http://localhost:5000";
    const navigate = useNavigate();

    function handleNameChange(e){
        setName(e.target.value);
    }
    function handleEmailChange(e){
        setEmail(e.target.value);
    }
    function handlePasswordChange(e){
        setPassword(e.target.value);
    }
    function handleConfirmPasswordChange(e){
        setConfirmPassword(e.target.value);
    }
    async function handleSubmit(e){
        e.preventDefault();
        const url = `${host}/api/auth/createUser`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "mode": "cors",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name,email,password }),
        });
        if(response.ok){
            const note = await response.json();
            localStorage.setItem('token',note.authToken);
            showAlert("You have been registered successfully", "success");
            navigate("/");
        }
        else{
            showAlert("Invalid details", "danger");
            navigate("/signup");
        }
    }
    return (
        <div className="container my-3">
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputName">Name</label>
                    <input type="text" className="form-control" id="exampleInputName" name="name" placeholder="Enter your Name" onChange={handleNameChange} required minLength={3} />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputEmail">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleEmailChange} />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" onChange={handlePasswordChange} required minLength={8} />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputPassword2">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" name="cpassword" placeholder="Confirm Password" onChange={handleConfirmPasswordChange} required minLength={8}/>
                </div>
                <button type="submit" className="btn btn-dark my-3">Submit</button>
            </form>
        </div>
    )
}

export default Signup;

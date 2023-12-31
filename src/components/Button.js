import React from 'react';

const oAuthSignIn = (name) =>{
  if (name ==="Google Signin"){
    window.open("http://localhost:5000/auth/google","_self");
  }
  else{
    window.open("http://localhost:5000/auth/facebook","_self");
  }
}

const Button = (props) => {
  return (
    <button className="btn btn-dark" onClick={()=>oAuthSignIn(props.name)}>
        {props.name}
    </button>
  )
}

export default Button;

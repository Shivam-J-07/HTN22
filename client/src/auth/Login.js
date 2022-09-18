import React, { useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import logo from '../images/ridemelogo.png'

function Login(props) {

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const navigate = useNavigate();

    async function authenticate(e) {
        e.preventDefault();
        console.debug(email, pw);
        try {
            const data = await fetch(`http://localhost:5000/login?email=${email}&password=${pw}`);
            // console.log(data)
            // console.log(data.json())
            const auth = await data.json();
            console.debug(auth);
            if (data.status === 200) {
                console.debug("Logged in successfully");
                localStorage.setItem("userId", auth.id);
                navigate("/")
            } else {
                console.debug("Did not log in successfully");
            }
        } catch (err) {
            console.debug("Error logging in:", err);
        }
        
    }
    return (
    <div className="Login flex-col">
      <h3 className='logo-name'>ReCycle</h3>
      <img src={logo} className="logo"/>
      <h1>Log In</h1>
      <form className="auth-form flex-col" onSubmit={authenticate}>
        <input type="text" value={email} onChange={event => setEmail(event.target.value)} placeholder="Email address" />
        <input type="password" value={pw} onChange={event => setPw(event.target.value)} placeholder="Password" />
        <button type="submit" className='btn'>Log In</button>
      </form>
      <span>Or { }
        <Link to="/register">register here</Link>
      </span>
    </div>
  );
}
  
export default Login;
import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import logo from '../images/ridemelogo.png'

function Login(props) {

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    async function authenticate(e) {
        e.preventDefault();
        console.debug(email, pw);
        try {
            const data = await fetch(`/login?email=${email}&password=${pw}`);
            const auth = await data.json();
            console.debug(auth);
            if (auth.response === 200) {
                console.debug("Logged in successfully");
                <redirect to="/" />
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
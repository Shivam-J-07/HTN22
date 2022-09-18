import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import logo from '../images/ridemelogo.png';

function Register(props) {

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [cpw, setCpw] = useState('');

    const updateEmail = e => {
        setEmail(e.target.value);
    }

    const updatePw = e => {
        setPw(e.target.value);
    }

    const updateCpw = e => {
        setCpw(e.target.value);
    }

    async function authenticate(e) {
        e.preventDefault();
        console.debug(email, pw, cpw);
        if (pw === cpw) {
            // create account
            try {
                const data = await fetch(`/register?email=${email}&password=${pw}`);
                const auth = await data.json();
                console.debug(auth);
                if (auth.response === 200) {
                    console.debug("Registered successfully");
                    <redirect to="/" />
                } else {
                    console.debug("Did not register successfully");
                }
            } catch (err) {
                console.debug("Error creating account:", err);
            }
            
        }
    }

    return (
        <div className="Register flex-col">
        <h3 className='logo-name'>ReCycle</h3>
        <img src={logo} className="logo"/>
        <h1>Register</h1>
        <form className="auth-form flex-col" onSubmit={authenticate}>
          <input type="text" value={email} onChange={event => setEmail(event.target.value)} placeholder="Email address" />
          <input type="password" value={pw} onChange={event => setPw(event.target.value)} placeholder="Password" />
          <input type="password" value={cpw} onChange={event => setCpw(event.target.value)} placeholder="Password" />
          <button type="submit" className='btn'>Create Account</button>
        </form>
        <span>Or { }
          <Link to="/login">log in here</Link>
        </span>
      </div>
  );
}
  
export default Register;
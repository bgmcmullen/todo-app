import React, { useContext, useState } from 'react';
import { When } from 'react-if';

import { LoginContext } from '../../Context/Auth/context.jsx';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import LoginPage from './LoginPage.jsx';

import SignupPage from './SignupPage.jsx';
import axios from 'axios';

const API = import.meta.env.VITE_API;

function Login() {
  const context = useContext(LoginContext);

  const [state, setState] = useState({ username: '', password: '', role: 'user'});

  const handleChange = e => {

    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleLogin = e => {
    e.preventDefault();
    context.login(state.username, state.password);
  };

  const handleSignup = async () => {

    try{
      await axios.post(`${API}api/v2/signup/`, state);
      alert('Account created');
    } catch(e) {
      alert('Account could not be created. Username may be unavailable.');
      console.error(e);
    }

  };

  return (
    <>
      <section className='login'>
        <When condition={context.loggedIn}>
          <button onClick={context.logout}>Log Out</button>
        </When>

        <When condition={!context.loggedIn}>
          <Router>
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign Up</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <Routes>
              <Route exact path="/" element={
                <LoginPage handleSubmit={handleLogin} handleChange={handleChange} state={state}/>
              }>

              </Route>
              <Route path="/signup" element={
                <SignupPage handleSignup={handleSignup} handleChange={handleChange} state={state}/>
              }>
              </Route>
            </Routes>
          </Router>
        </When>
      </section>
    </>
  );
}

export default Login;

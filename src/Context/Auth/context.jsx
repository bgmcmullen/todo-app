import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import { jwtDecode } from 'jwt-decode';

import axios from 'axios';

const API = import.meta.env.VITE_API;

export const LoginContext = React.createContext();

function LoginProvider(props) {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ capabilities: [] });
  const [error, setError] = useState(null);
  const [token, setToken] = useState('')


  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  }


  const login = async (username, password) => {

    let res = null;
    let token = null;
    try {
      res = await axios.post(`${API}api/v2/signin/`, {}, {auth: {username, password}});
      token = res.data.user.token;
    } catch {
      alert('Invalid login');
    }


    const user = res.data.user

    try {
    const user = res.data.user
      validateToken(user, token);
    } catch (e) {

      setLoginState(loggedIn, token, user, e);
      console.error(e);
    }

  }

  const logout = () => {
    setLoginState(false, null, {});
  };

  const validateToken = (user, token) => {

    try {
      let validUser = user;
      setLoginState(true, token, validUser);
    }
    catch (e) {
      setLoginState(false, null, {}, e);
      console.log('Token Validation Error', e);
    }

  };

  const setLoginState = (loggedIn, token, user, error) => {
    cookie.save('auth', token);
    cookie.save('user', user);
    setToken(token);
    setLoggedIn(loggedIn);
    setUser(user);
    setError(error);
  };

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const userToken = cookie.load('user');
    const token = qs.get('token') || cookieToken || null;
    const user = qs.get('user') || userToken || null;
    if(token && user){
      validateToken(user, token);
    }


  }, []);

  return (
    <LoginContext.Provider value={{ loggedIn, can, login, logout, user, error, token }}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;

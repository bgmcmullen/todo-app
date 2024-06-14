import React from 'react';

import Todo from './Components/Todo';

import Auth from './Context/Auth/auth.jsx';
import LoginContext from './Context/Auth/context.jsx';
import Login from './Components/Login/index.jsx'


export default function App() {
    return (
      <>
        <LoginContext>
          <Login />
          <Auth>
            <Todo />
          </Auth>
        </LoginContext>
      </>
    );
}

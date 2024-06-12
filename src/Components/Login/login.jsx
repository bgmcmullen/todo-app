import React, { useContext, useState } from 'react';
import { When } from 'react-if';

import { LoginContext } from '../../Context/Auth/context.jsx';

function Login(props) {
  const context = useContext(LoginContext);

  const [state, setState] = useState({ username: '', password: '' });

  // constructor(props) {
  //   super(props);
  //   this.state = { username: '', password: '' };
  // }

  const handleChange = e => {
    setState({ [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    context.login(state.username, state.password);
  };

  return (
    <>
      <section className='login'>
        <When condition={context.loggedIn}>
          <button onClick={context.logout}>Log Out</button>
        </When>

        <When condition={!context.loggedIn}>
          <h1 style={{ color: 'white' }}>Please Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="UserName"
              name="username"
              onChange={handleChange}
            />
            <input
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            <button>Login</button>
          </form>
        </When>
      </section>
    </>
  );
}

export default Login;

import React from 'react';


const login = (props) => {
  return (
    <>
      <h1 style={{ color: 'white' }}>Please Login</h1><form onSubmit={props.handleSubmit}>
        <input
          placeholder="UserName"
          name="username"
          onChange={props.handleChange} value={props.state.username}/>
        <input
          placeholder="password"
          name="password"
          onChange={props.handleChange} value={props.state.password}/>
        <button>Login</button>
      </form>
    </>
  );
}

export default login;




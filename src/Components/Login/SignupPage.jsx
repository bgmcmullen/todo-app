import React from 'react';

const SignupPage = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Call your handleSignup function passed via props
    props.handleSignup();
  };

  return (
    <>
      <h1 style={{ color: 'white' }}>Please Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="UserName"
          name="username"
          onChange={props.handleChange}
          value={props.state.username}
        />
        <input
          placeholder="Password"
          name="password"
          onChange={props.handleChange}
          value={props.state.password}
        />
        <button type="submit">Sign Up</button>

        <hr />
        <div style={{ background: 'white' }}>
          <input
            style={{ display: 'inline-block' }}
            type="radio"
            id="user"
            name="role"
            value="user"
            checked={props.state.role === 'user'}
            onChange={props.handleChange}
          />
          <label htmlFor="user">User</label>

          <input
            style={{ display: 'inline' }}
            type="radio"
            id="writer"
            name="role"
            value="writer"
            checked={props.state.role === 'writer'}
            onChange={props.handleChange}
          />
          <label htmlFor="writer">Writer</label>

          <input
            style={{ display: 'inline' }}
            type="radio"
            id="editor"
            name="role"
            value="editor"
            checked={props.state.role === 'editor'}
            onChange={props.handleChange}
          />
          <label htmlFor="editor">Editor</label>

          <input
            style={{ display: 'inline' }}
            type="radio"
            id="admin"
            name="role"
            value="admin"
            checked={props.state.role === 'admin'}
            onChange={props.handleChange}
          />
          <label htmlFor="admin">Admin</label>

          <div>
            Selected option: {props.state.role}
          </div>
        </div>
      </form>
    </>
  );
}

export default SignupPage;

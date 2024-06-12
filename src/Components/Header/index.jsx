import React, { useEffect, useState, useContext } from 'react';

import { LoginContext } from '../../Context/Auth/context.jsx';


const Header = (props) => {
  const context = useContext(LoginContext);

  console.log(context);

  return (
    <header data-testid="todo-header">
      <h1>Welcome {context.user.name}</h1>
      <hr />
      <h1 data-testid="todo-h1">To Do List: {props.incomplete} items pending</h1>
    </header>
  );
}

export default Header;



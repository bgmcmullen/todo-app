import React, { useEffect, useState, useContext } from 'react';

import { LoginContext } from '../../Context/Auth/context.jsx';


const Header = (props) => {
  const context = useContext(LoginContext);

  const [name, setName] = useState(null)

  function getName() {
    try {
      setName(context.user.username);
    } catch {
      console.log("no name given")
    }


  }

  useEffect(() => {
    getName();

  }, [context.user.username]);




  return (
    <header data-testid="todo-header">
      <h1>Welcome {name}</h1>
      <hr />
      <h1 data-testid="todo-h1">To Do List: {props.incomplete} items pending</h1>
    </header>
  );
}

export default Header;

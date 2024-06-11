import React, { useEffect, useState } from 'react';


const Header = (props) => {
  return (
    <header data-testid="todo-header">
      <h1 data-testid="todo-h1">To Do List: {props.incomplete} items pending</h1>
    </header>
  );
}

export default Header;



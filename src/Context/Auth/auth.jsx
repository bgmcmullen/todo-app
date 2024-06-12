import React, { useContext } from 'react';
import { When } from 'react-if';

import { LoginContext } from './context.jsx';

function Auth(props) {

  const context = useContext(LoginContext);

  let okToRender = false;

  function getOkToRender(){
    try{
      const isLoggedIn = context.loggedIn;
      const canDo = props.capability ? context.can(props.capability) : true;
      okToRender = isLoggedIn && canDo;
    } catch {
      okToRender = true;
    }
  }
  getOkToRender();


  return (
    <When condition={okToRender}>
      {props.children}
    </When>
  );
}

export default Auth;

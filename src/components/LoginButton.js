import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  useEffect(() => {
    if (isAuthenticated === false) {
        loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect])

  return !isAuthenticated && (
    <button onClick={loginWithRedirect}>Log in</button>
  );
}

export default LoginButton;
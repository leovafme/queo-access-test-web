import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import IconButton from '@material-ui/core/IconButton';

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
    <IconButton color="inherit" onClick={loginWithRedirect}>
      <VpnKeyIcon />
    </IconButton>
  );
}

export default LoginButton;
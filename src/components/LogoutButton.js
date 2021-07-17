import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';

function LogoutButton() {
  const {
    isAuthenticated,
    logout,
  } = useAuth0();

  return isAuthenticated && (
    <IconButton color="inherit" onClick={() => {
      logout({ returnTo: window.location.origin });
    }}>
      <ExitToAppIcon />
    </IconButton>
  );
}

export default LogoutButton;
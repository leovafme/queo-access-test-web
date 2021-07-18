import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BusinessIcon from '@material-ui/icons/Business';
import { Link as RouterLink } from 'react-router-dom';

export const optionsListItems = (
    <>
      <ListItem button component={RouterLink} to='/dashboard/companies'>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Companies" />
      </ListItem>
      <ListItem button component={RouterLink} to='/dashboard/employees'>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Employees" />
      </ListItem>
    </>
);
  

export const mainListItems = (
  <div>
    <ListItem button component={RouterLink} to='/dashboard'>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    {optionsListItems}
  </div>
);


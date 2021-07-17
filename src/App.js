import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Loading from "./components/Loading";
import { NoMatch } from "./views/NoMatch";
import DashboardView from "./views/Dashboard";

import "./App.css";

const App = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    isLoading
  } = useAuth0();

  useEffect(() => {
    if (isLoading === false && isAuthenticated === false) {
        loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect, isLoading])

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Switch>
      <Route exact path="/">
        {isAuthenticated ? <Redirect to="/dashboard" /> : <p>Public page</p>}
      </Route>

      <Route path="/dashboard" component={DashboardView} />
      <Route component={NoMatch} />
    </Switch>
  );
};

export default App;
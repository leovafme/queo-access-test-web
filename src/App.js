import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Nav from "./components/Nav";
import Loading from "./components/Loading";
import { NoMatch } from "./views/NoMatch";
import { ProfileView } from "./views/ProfileView";

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
    <div id="app" className="d-flex flex-column h-100">
      <Nav />
      <div className="container flex-grow-1">
        <Switch>
          <Route path="/" exact component={() => <p>home</p>} />
          <Route path="/profile" component={ProfileView} />
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
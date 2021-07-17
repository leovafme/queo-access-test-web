import React from 'react';
import { useLocation, Link } from "react-router-dom";

export function NoMatch() {
  let location = useLocation();

  return (<>
    <p>Sorry, the page ${location.pathname} does not exist.</p>
    <Link to={`/`}>
      <button type="primary">Back Home</button>
    </Link>
  </>);
};

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
    Link,
} from "react-router-dom";

const Home = () => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated?
        <>
            <p>
                This is a home page select module 
            </p>
            <Link to="/companies">Companies</Link>
        </>:
        <p>Welcome to Queo Access, Loading...</p>;
};


export default Home;
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated? <>This is a home page</>: <p>Welcome to Queo Access, Loading...</p>;
};


export default Home;
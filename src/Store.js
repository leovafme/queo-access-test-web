import React, { useEffect, useState, useContext } from 'react';
import CompanyService from "./api/CompanyService";
import { useAuth0 } from '@auth0/auth0-react';

const StoreApi = React.createContext({
    companyService: undefined,
    token: ""
});

export const useApiService = () => useContext(StoreApi);

export const StoreApiProvider = ({ children }) => {
    const [companyService, setCompanyService] = useState(new CompanyService());
    const { getAccessTokenSilently } = useAuth0();
    const [token, setToken] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const token = await getAccessTokenSilently({ audience: 'https://queoaccess.com/' });
                setToken(token)
                // set token to company
                setCompanyService(new CompanyService(token))
            } catch (e) {
                console.error(e);
            }
        })();
    }, [getAccessTokenSilently]);

    return (
        <StoreApi.Provider
            value={{
                token,
                companyService,
            }}
        >
            {children}
        </StoreApi.Provider>
    );
}


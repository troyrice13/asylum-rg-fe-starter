import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
    const history = useHistory();
    const domain = 'dev-djnk3sshry2xk6ds.us.auth0.com';
    const clientId = 'MEZ3vGlAeibrDfbnOef5Ju9my54kyqUt';

    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
        >
        {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;
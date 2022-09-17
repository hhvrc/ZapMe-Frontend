import { Button } from "@mui/material";
import cryptoRandomString from "crypto-random-string";
import * as React from "react";
import { useCallback } from "react";
import { Helmet } from "react-helmet-async";
import GoogleIcon from '@mui/icons-material/Google';

const AUTH_URL = "https://google.com/login/oauth/authorize";

interface IProps {
  clientId: string;
  redirectUri: string;
  onLoginStart?: () => void;
  onLoginSuccess?: (applicationId: string) => void;
  onLoginFailure?: (applicationId: string) => void;
}

function LoginGoogleSSO({ clientId, redirectUri, onLoginStart, onLoginSuccess, onLoginFailure }: IProps): JSX.Element {
  const [authState, setAuthState] = React.useState<string | null>(null);
  const [code, setCode] = React.useState<string | null>(null);

  const handleLogin = useCallback(() => {
    // Set authState to a random string to prevent CSRF
    let authState = cryptoRandomString({ length: 32, type: "url-safe" });

    setAuthState(authState);

    const url = `${AUTH_URL}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${authState}`;

    // Open a new window to the auth URL
    window.open(url, "_self");
  } , []);

  return(
    <>
      <Helmet>
        <meta name="google-signin-scope" content="profile email" />
        <meta name="google-signin-client_id" content={clientId} />
        <script src="https://apis.google.com/js/platform.js" async defer></script>
      </Helmet>
      <Button>
        <GoogleIcon sx={{mr:1}}/>
        Login using Google
      </Button>
    </>
  );
}

export default LoginGoogleSSO;
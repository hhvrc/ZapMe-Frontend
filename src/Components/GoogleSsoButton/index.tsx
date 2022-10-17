import { Button } from "@mui/material";
import cryptoRandomString from "crypto-random-string";
import * as React from "react";
import { useCallback } from "react";
import { Helmet } from "react-helmet-async";
import GoogleIcon from '@mui/icons-material/Google';


const BackendUrl = process.env.REACT_APP_BACKEND_URL as string;

const GoogleClientId = process.env.REACT_APP_GOOGLE_CLIENTID as string;
const GoogleScopes = process.env.REACT_APP_GITHUB_SCOPES as string;
const GoogleRedirectUrl = BackendUrl + "/signin-google";

const AUTH_URL = `https://google.com/login/oauth/authorize?client_id=${GoogleClientId}&redirect_uri=${encodeURIComponent(GoogleRedirectUrl)}&state=`;

interface IProps {
  onLoginStart?: () => void;
  onLoginSuccess?: (applicationId: string) => void;
  onLoginFailure?: (applicationId: string) => void;
}

function GoogleSsoButton({ onLoginStart, onLoginSuccess, onLoginFailure }: IProps): JSX.Element {
  const [authState, setAuthState] = React.useState<string | null>(null);
  const [code, setCode] = React.useState<string | null>(null);

  const handleLogin = useCallback(() => {
    // Set authState to a random string to prevent CSRF
    let authState = cryptoRandomString({ length: 32, type: "url-safe" });

    setAuthState(authState);

    // Open a new window to the auth URL
    window.open(AUTH_URL + authState, "_self");
  } , []);

  return(
    <>
      <Helmet>
        <meta name="google-signin-scope" content={GoogleScopes} />
        <meta name="google-signin-client_id" content={GoogleClientId} />
        <script src="https://apis.google.com/js/platform.js" async defer></script>
      </Helmet>
      <Button>
        <GoogleIcon sx={{mr:1}}/>
        Login using Google
      </Button>
    </>
  );
}

export default GoogleSsoButton;
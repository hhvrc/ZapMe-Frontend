import * as React from "react";
import cryptoRandomString from "crypto-random-string";
import { useCallback } from "react";
import { Button } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';


const BackendUrl = process.env.REACT_APP_BACKEND_URL as string;

const GithubClientId = process.env.REACT_APP_GITHUB_CLIENTID as string;
const GithubScopes = process.env.REACT_APP_GITHUB_SCOPES as string;
const GithubRedirectUrl = BackendUrl + "signin-github";

const AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${GithubClientId}&redirect_uri=${encodeURIComponent(GithubRedirectUrl)}&scope=${encodeURIComponent(GithubScopes)}&state=`;

interface IProps {
  onLoginStart?: () => void;
  onLoginSuccess?: (applicationId: string) => void;
  onLoginFailure?: (applicationId: string) => void;
}

function GithubSsoButton({ onLoginStart, onLoginSuccess, onLoginFailure }: IProps): JSX.Element {
  const [authState, setAuthState] = React.useState<string | null>(null);
  const [code, setCode] = React.useState<string | null>(null);

  const handleLogin = useCallback(() => {
    if (onLoginStart) {
      onLoginStart();
    }

    // Set authState to a random string to prevent CSRF
    let authState = cryptoRandomString({ length: 32, type: 'url-safe' });

    setAuthState(authState);

    // Open a new window to the auth URL
    window.open(AUTH_URL + authState, "_self");
  } , []);

  return(
    <>
      <Button onClick={handleLogin}>
        <GitHubIcon sx={{mr:1}}/>
        Login using Github
      </Button>
    </>
  );
}

export default GithubSsoButton;
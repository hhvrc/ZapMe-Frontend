import * as React from "react";
import cryptoRandomString from "crypto-random-string";
import { useCallback } from "react";
import { Button } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

const AUTH_URL = "https://github.com/login/oauth/authorize";

interface IProps {
  clientId: string;
  redirectUri: string;
  scopes: string;
  onLoginStart?: () => void;
  onLoginSuccess?: (applicationId: string) => void;
  onLoginFailure?: (applicationId: string) => void;
}

function LoginGithubSSO({ clientId, redirectUri, scopes, onLoginStart, onLoginSuccess, onLoginFailure }: IProps): JSX.Element {
  const [authState, setAuthState] = React.useState<string | null>(null);
  const [code, setCode] = React.useState<string | null>(null);

  const handleLogin = useCallback(() => {
    if (onLoginStart) {
      onLoginStart();
    }

    // Set authState to a random string to prevent CSRF
    let authState = cryptoRandomString({ length: 32, type: 'url-safe' });

    setAuthState(authState);

    const url = `${AUTH_URL}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&state=${authState}`;

    // Redirect to the auth URL
    window.location.href = url;
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

export default LoginGithubSSO;
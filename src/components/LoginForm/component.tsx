import { Button, ButtonGroup, Paper, TextField } from "@mui/material";
import * as React from "react";
import { useCallback } from "react";
import { Helmet } from "react-helmet-async";
import LoginGithubSSO from "../LoginGithubSSO/component";
import LoginGoogleSSO from "../LoginGoogleSSO/component";
import { login } from "./api"
import { validateUsername, validatePassword } from "./logic";

const BackendUrl = process.env.REACT_APP_BACKEND_URL as string;

const GithubClientId = process.env.REACT_APP_GITHUB_CLIENTID as string;
const GithubScopes = process.env.REACT_APP_GITHUB_SCOPES as string;

const GoogleClientId = process.env.REACT_APP_GOOGLE_CLIENTID as string;

const GoogleRedirectUrl = BackendUrl + "signin-google";
const GithubRedirectUrl = BackendUrl + "signin-github";

interface IProps {
}

function LoginForm(props: IProps): JSX.Element {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [usernameError, setUsernameError] = React.useState<string|null>(null);
  const [passwordError, setPasswordError] = React.useState<string|null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const handleUsername = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value;

    let result = validateUsername(input);
    
    setUsernameError(result);
    if (result === null) {
      setUsername(input);
    }
  }, []);
  const handlePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value;

    let result = validatePassword(input);

    setPasswordError(result);
    if (result === null) {
      setPassword(input);
    }
  }, []);
  const handleSubmit = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (isSubmitting) {
      return;
    }

    //Prevent page reload
    if (event) {
      event.preventDefault();
    }

    setIsSubmitting(true);
  
    // Try to login
    login(username, password,
      (body) => {
        setIsSubmitting(false);
        console.log(body);
        alert(body);
      },
      (error) => {
        setIsSubmitting(false);
        // Show error popup
        alert(error);
      }
    );
  }, [username, password, isSubmitting]);

  let usernameHasError = usernameError != null;
  let passwordHasError = passwordError != null;
  let anyErrors =  usernameHasError || passwordHasError;

  return(
      <Paper elevation={3} sx={{ p:2, display:'inline-flex', flexDirection:'column'}}>
        <Helmet>
          <title>{ isSubmitting ? 'ZapMe - Logging in...' : 'ZapMe - Login' }</title>
        </Helmet>
        <ButtonGroup variant="outlined" size="medium" disabled={isSubmitting} orientation="vertical" sx={{mb:2}} >
          <LoginGoogleSSO clientId={GoogleClientId} redirectUri={GoogleRedirectUrl} />
          <LoginGithubSSO clientId={GithubClientId} redirectUri={GithubRedirectUrl} scopes={GithubScopes} />
        </ButtonGroup>
        <TextField label="Username" variant="standard" disabled={isSubmitting} error={usernameHasError} helperText={usernameError} onChange={handleUsername} sx={{mb:2}} />
        <TextField label="Password" variant="standard" disabled={isSubmitting} error={passwordHasError} helperText={passwordError} onChange={handlePassword} type="password" sx={{mb:2}}/>
        <Button color="primary" variant="contained" disabled={anyErrors || isSubmitting} onClick={handleSubmit} type="submit" sx={{mt:2}}> Login </Button>
      </Paper>
  );
}

export default LoginForm;
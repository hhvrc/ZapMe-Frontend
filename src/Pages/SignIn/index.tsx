import { Button, ButtonGroup, Paper, TextField } from "@mui/material";
import { stat } from "fs";
import * as React from "react";
import { useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { GithubSsoButton, GoogleSsoButton } from "Components";
import { validateUsername, validatePassword } from "Utils/Validators";
import { AuthenticationApi, Configuration } from 'Api/generated';

const BackendUrl = process.env.REACT_APP_BACKEND_URL as string;

const authenticationApi = new AuthenticationApi(new Configuration({ basePath: BackendUrl }));

interface IState {
  username: string;
  password: string;
  usernameError: string|null;
  passwordError: string|null;
}

// Initial state
const initialState: IState = {
  username: '',
  password: '',
  usernameError: null,
  passwordError: null,
};

// React.ChangeEvent<HTMLInputElement> reducer
function reducer(state: IState, event: React.ChangeEvent<HTMLInputElement>): IState {
  switch (event.target.name) {
    case 'uname':
      return {
        ...state,
        username: event.target.value,
        usernameError: validateUsername(event.target.value),
      };
    case 'passw':
      return {
        ...state,
        password: event.target.value,
        passwordError: validatePassword(event.target.value),
      };
    default:
      return state;
  }
}

interface IProps {
}

function SignInPage(props: IProps): JSX.Element {
  const [{ username, password, usernameError, passwordError }, dispatch] = React.useReducer(reducer, initialState);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  let usernameHasError = usernameError != null && usernameError !== '';
  let passwordHasError = passwordError != null && passwordError !== '';
  let submitDisabled =  !username || !password || isSubmitting;

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (submitDisabled) {
      return;
    }

    setIsSubmitting(true);

    // TODO: implement TOS version acceptance
    authenticationApi.authSignIn({ username: username, password: password })
    .then(
        (account) => {
            console.log(account.data);
        },
        (error) => {
            console.log(error.response);
        }
    )
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        setIsSubmitting(false);
    });
  };

  return(
      <Paper elevation={3} sx={{ p:2, display:'inline-flex', flexDirection:'column'}}>
        <Helmet>
          <title>{ isSubmitting ? 'ZapMe - Logging in...' : 'ZapMe - Login' }</title>
        </Helmet>
        <ButtonGroup variant="outlined" size="medium" disabled={isSubmitting} orientation="vertical" sx={{mb:2}} >
          <GithubSsoButton />
          <GoogleSsoButton />
        </ButtonGroup>
        <TextField name="uname" label="Username" variant="standard" disabled={isSubmitting} error={usernameHasError} helperText={usernameError} onChange={dispatch} sx={{mb:2}} />
        <TextField name="passw" label="Password" variant="standard" disabled={isSubmitting} error={passwordHasError} helperText={passwordError} onChange={dispatch} type="password" sx={{mb:2}}/>
        <Button color="primary" variant="contained" disabled={submitDisabled} onClick={handleSubmit} type="submit" sx={{mt:2}}> Login </Button>
      </Paper>
  );
}

export default SignInPage;
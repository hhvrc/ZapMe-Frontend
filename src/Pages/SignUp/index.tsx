import { Button, ButtonGroup, Paper, TextField } from "@mui/material";
import { stat } from "fs";
import * as React from "react";
import { useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { GithubSsoButton, GoogleSsoButton } from "Components";
import { validateUsername, validatePassword } from "Utils/Validators";

interface IState {
  username: string;
  email: string;
  password: string;
  usernameError: string|null;
  emailError: string|null;
  passwordError: string|null;
}

// Initial state
const initialState: IState = {
  username: '',
  email: '',
  password: '',
  usernameError: null,
  emailError: null,
  passwordError: null,
};

// React.ChangeEvent<HTMLInputElement> reducer
function reducer(state: IState, event: React.ChangeEvent<HTMLInputElement>): IState {
  console.log(`Name: ${event.target.name}, Value: ${event.target.value}`);
  switch (event.target.name) {
    case 'uname':
      state.username = event.target.value;
      state.usernameError = validateUsername(state.username);
      console.log(`Username: ${state.username}, Error: ${state.usernameError}`);
      return state;
    case 'passw':
      state.password = event.target.value;
      state.passwordError = validatePassword(state.password);
      return state;
    case 'email':
      state.email = event.target.value;
      state.emailError = validatePassword(state.email);
      return state;
    default:
      return state;
  }
}

interface IProps {
}

function SignUpPage(props: IProps): JSX.Element {
  const [{ username, email, password, usernameError, emailError, passwordError }, dispatch] = React.useReducer(reducer, initialState);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  let usernameHasError = usernameError != null;
  let emailHasError = emailError != null;
  let passwordHasError = passwordError != null;
  let submitDisabled =  usernameHasError || emailHasError || passwordHasError || isSubmitting;

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (submitDisabled) {
      return;
    }

    setIsSubmitting(true);

    console.log(`Submitting username: ${username}, email: ${email} and password: ${password}`);
  };

  return(
      <Paper elevation={3} sx={{ p:2, display:'inline-flex', flexDirection:'column'}}>
        <Helmet>
          <title>{ isSubmitting ? 'ZapMe - Logging in...' : 'ZapMe - Login' }</title>
        </Helmet>
        <TextField name="uname" label="Username" variant="standard" disabled={isSubmitting} error={usernameHasError} helperText={usernameError} onChange={dispatch} sx={{mb:2}} />
        <TextField name="email" label="Email" variant="standard" disabled={isSubmitting} error={emailHasError} helperText={emailError} onChange={dispatch} sx={{mb:2}}/>
        <TextField name="passw" label="Password" variant="standard" disabled={isSubmitting} error={passwordHasError} helperText={passwordError} onChange={dispatch} type="password" sx={{mb:2}}/>
        <Button color="primary" variant="contained" disabled={submitDisabled} onClick={handleSubmit} type="submit" sx={{mt:2}}> Sign Up </Button>
      </Paper>
  );
}

export default SignUpPage;
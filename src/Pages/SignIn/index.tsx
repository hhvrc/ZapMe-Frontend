import { Button, ButtonGroup, Paper, TextField, CircularProgress } from "@mui/material";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { GithubSsoButton, GoogleSsoButton } from "Components";
import { AuthenticationApi, Configuration } from 'Api/generated';
import { useSnackbar } from 'notistack';

const BackendUrl = process.env.REACT_APP_BACKEND_URL as string;

const authenticationApi = new AuthenticationApi(new Configuration({ basePath: BackendUrl }));

interface IState {
  username: string;
  usernameError: string | null;
  password: string;
  passwordError: string | null;
  submitting: boolean;
}

// Initial state
const initialState: IState = {
  username: '',
  usernameError: null,
  password: '',
  passwordError: null,
  submitting: false
};

interface IReducerAction {
  type: string;
  data: any;
}

function reducer(state: IState, event: IReducerAction): IState {
  state = {
    ...state,
    [event.type]: event.data
  };

  return state;
}

interface IProps {
}

function SignInPage(props: IProps): JSX.Element {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [{ username, usernameError, password, passwordError, submitting }, dispatch] = React.useReducer(reducer, initialState);

  let buttonLabel = submitting ? 'Signing in...' : 'Sign in';
  let windowTitle = 'ZapMe - ' + buttonLabel;
  let submitButtonDisabled = submitting || !username || !password;

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    dispatch({ type: name, data: value });
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (submitButtonDisabled) {
      return;
    }

    dispatch({ type: 'submitting', data: true });

    // TODO: implement TOS version acceptance
    authenticationApi.authSignIn({ username: 's', password: password })
    .then(
      (account) => {
        console.log(account.data);
      },
      (error) => {
        enqueueSnackbar('Something went wrong, please try again later', { variant: 'error' });
      }
    )
    .catch((error) => {
      enqueueSnackbar('Something went wrong, please try again later', { variant: 'error' });
    })
    .finally(() => {
      dispatch({ type: 'submitting', data: false });
    });
  };

  return(
      <Paper elevation={3} sx={{ p:2, display:'inline-flex', flexDirection:'column'}}>
        <Helmet>
          <title>{windowTitle}</title>
        </Helmet>
        <ButtonGroup variant="outlined" size="medium" disabled={submitting} orientation="vertical" sx={{mb:2}} >
          <GithubSsoButton />
          <GoogleSsoButton />
        </ButtonGroup>
        <TextField name="username" label="Username" variant="standard" disabled={submitting} error={!!usernameError} helperText={usernameError} onChange={handleInput} sx={{mb:2}} />
        <TextField name="password" label="Password" variant="standard" disabled={submitting} error={!!passwordError} helperText={passwordError} onChange={handleInput} type="password" sx={{mb:2}}/>
        <Button color="primary" startIcon={submitting ? <CircularProgress/> : false} variant="contained" disabled={submitButtonDisabled} onClick={handleSubmit} type="submit" sx={{mt:2}}>{buttonLabel}</Button>
      </Paper>
  );
}

export default SignInPage;
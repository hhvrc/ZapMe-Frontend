import { Button, ButtonGroup, Paper, TextField, CircularProgress, Typography } from "@mui/material";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { GithubSsoButton, GoogleSsoButton } from "Components";
import { AuthenticationApi, Configuration } from 'Api/generated';
import { useSnackbar } from 'notistack';
import { NavLink } from "react-router-dom";
import { Link } from "@mui/icons-material";

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
    dispatch({ type: name + 'Error', data: null });
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (submitButtonDisabled) {
      return;
    }

    dispatch({ type: 'submitting', data: true });

    // TODO: implement TOS version acceptance
    authenticationApi.authSignIn({ username: username, password: password })
    .then(
      (account) => {
        console.log(account.data);
      },
      (error) => {
        if (!error.response) {
          enqueueSnackbar('Unable to connect to the server', { variant: 'error', preventDuplicate: true });
          return;
        }

        // Check if response is a 5xx error
        if (error.response.status >= 500) {
          enqueueSnackbar('Server error', { variant: 'error', preventDuplicate: true });
          return;
        }

        if (!error.response.data) {
          enqueueSnackbar('Unknown error', { variant: 'error' });
          return;
        }

        let { fields, notification } = error.response.data;

        if (fields) {
          for (const [key, value] of Object.entries(fields)) {
            dispatch({ type: key + 'Error', data: value });
          }
        }

        if (notification) {
          let { severity, title, message } = notification;
          enqueueSnackbar(title + ': ' + message, { variant: severity, preventDuplicate: true });
        }

        if (error.response.data.errors) {
          error.response.data.errors.forEach((error: any) => {
            enqueueSnackbar(error.message, { variant: 'error' });
          });
        }
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
    <>
      <Helmet>
        <title>{windowTitle}</title>
      </Helmet>
      <Paper elevation={3} sx={{ p:2, display:'inline-flex', flexDirection:'column'}}>
        <Typography variant="h1" sx={{ mb:2, textAlign:'center', fontSize: 40, fontWeight: 'bold', textTransform: 'none', color: '#2196f3' }}>
          Sign In
        </Typography>
        <TextField name="username" label="Username" variant="standard" disabled={submitting} error={!!usernameError} helperText={usernameError} onChange={handleInput} sx={{mb:2}} />
        <TextField name="password" label="Password" variant="standard" disabled={submitting} error={!!passwordError} helperText={passwordError} onChange={handleInput} type="password" sx={{mb:0}}/>
        <NavLink to="/forgot-password" style={{ textDecoration:'none' }}>
          <Button color="primary" variant="text" disabled={submitting} sx={{ fontSize:'10px' }}>Forgot password?</Button>
        </NavLink>
        <Button color="primary" startIcon={submitting ? <CircularProgress/> : false} variant="contained" disabled={submitButtonDisabled} onClick={handleSubmit} type="submit" sx={{ mt:1, mb:1 }}>{buttonLabel}</Button>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ width:'100%', borderBottom:'1px solid #ccc' }}></div>
          <div style={{ width:'auto', padding:'0 10px', color:'#ccc' }}>or</div>
          <div style={{ width:'100%', borderBottom:'1px solid #ccc' }}></div>
        </div>
        <ButtonGroup variant="outlined" size="medium" disabled={submitting} orientation="horizontal" sx={{ mt:1, mb: 3 }}>
          <GithubSsoButton />
          <GoogleSsoButton />
        </ButtonGroup>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ fontSize:'13px' }}>Don't have an account?</div>
          <NavLink to="/sign-up" style={{ textDecoration:'none' }}>
            <Button color="primary" variant="text" disabled={submitting} sx={{ fontSize:'10px' }}>Sign Up</Button>
          </NavLink>
        </div>
      </Paper>
    </>
  );
}

export default SignInPage;
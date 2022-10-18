import { Button, Paper, TextField, CircularProgress } from "@mui/material";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { validateUsername, validateEmail, validatePassword } from "Utils/Validators";
import { AccountApi, Configuration } from 'Api/generated';
import { useSnackbar } from 'notistack';
import ReCAPTCHA from "react-google-recaptcha";

const BackendUrl = process.env.REACT_APP_BACKEND_URL as string;
const RecaptchaSiteKey = process.env.REACT_APP_RECAPTCHA_SITEKEY as string;

const accountApi = new AccountApi(new Configuration({ basePath: BackendUrl }));

interface IState {
  username: string;
  usernameError: string|null;
  email: string;
  emailError: string|null;
  password: string;
  passwordError: string|null;
  recaptcha: string;
  submitting: boolean;
}

// Initial state
const initialState: IState = {
  username: '',
  usernameError: null,
  email: '',
  emailError: null,
  password: '',
  passwordError: null,
  recaptcha: '',
  submitting: false
};

interface IReducerAction {
  type: string;
  data: any;
}

function reducer(state: IState, event: IReducerAction): IState {
  let { type, data } = event;

  switch (type) {
    case 'username':
      return {
        ...state,
        username: data,
        usernameError: validateUsername(data)
      };
    case 'email':
      return {
        ...state,
        email: data,
        emailError: validateEmail(data)
      };
    case 'password':
      return {
        ...state,
        password: data,
        passwordError: validatePassword(data)
      };
    default:
      return {
        ...state,
        [type]: data
      }
  }
}

interface IProps {
}

function SignUpPage(props: IProps): JSX.Element {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [{ username, usernameError, email, emailError, password, passwordError, recaptcha, submitting }, dispatch] = React.useReducer(reducer, initialState);

  let buttonLabel = submitting ? 'Signing up...' : 'Sign up';
  let windowTitle = 'ZapMe - ' + buttonLabel;
  let submitButtonDisabled = submitting || !username || !!usernameError || !email || !!emailError || !password || !!passwordError || !recaptcha;

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    dispatch({ type: name, data: value });
  }
  function handleRecaptcha(value: string|null = null) {
    dispatch({ type: 'recaptcha', data: value || '' });
  }

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (submitButtonDisabled) {
      return;
    }

    dispatch({ type: 'submitting', data: true });

    // TODO: implement TOS version acceptance
    accountApi.createAccount({ username: username, password: password, email: email, acceptedTosVersion: 1, recaptcha_response: recaptcha })
    .then(
        (account) => {
          console.log('Account created', account);
          // TODO: store account info in local storage
          // TODO: redirect to home page
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
        <TextField name="username" label="Username" variant="standard" disabled={submitting} error={!!usernameError} helperText={usernameError} onChange={handleInput} sx={{mb:2}} />
        <TextField name="email" label="Email" variant="standard" disabled={submitting} error={!!emailError} helperText={emailError} onChange={handleInput} sx={{mb:2}}/>
        <TextField name="password" label="Password" variant="standard" disabled={submitting} error={!!passwordError} helperText={passwordError} onChange={handleInput} type="password" sx={{mb:2}}/>
        <ReCAPTCHA sitekey={RecaptchaSiteKey} onChange={handleRecaptcha} onExpired={handleRecaptcha} />
        <Button color="primary" startIcon={submitting ? <CircularProgress/> : false} variant="contained" disabled={submitButtonDisabled} onClick={handleSubmit} type="submit" sx={{mt:2}}>{buttonLabel}</Button>
      </Paper>
  );
}

export default SignUpPage;
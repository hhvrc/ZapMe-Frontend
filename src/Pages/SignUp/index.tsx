import { Button, Paper, TextField } from "@mui/material";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { validateUsername, validateEmail, validatePassword } from "Utils/Validators";
import { AccountApi, Configuration } from 'Api/generated';
import ReCAPTCHA from "react-google-recaptcha";

const BackendUrl = process.env.REACT_APP_BACKEND_URL as string;
const RecaptchaSiteKey = process.env.REACT_APP_RECAPTCHA_SITEKEY as string;

const accountApi = new AccountApi(new Configuration({ basePath: BackendUrl }));

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
  usernameError: '',
  emailError: '',
  passwordError: '',
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
    case 'email':
      return {
        ...state,
        email: event.target.value,
        emailError: validateEmail(event.target.value),
      };
    default:
      return state;
  }
}

interface IProps {
}

function SignUpPage(props: IProps): JSX.Element {
  const [{ username, email, password, usernameError, emailError, passwordError }, dispatch] = React.useReducer(reducer, initialState);
  const [recaptchaToken, setRecaptchaToken] = React.useState<string|null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  let usernameHasError = usernameError != null && usernameError !== '';
  let emailHasError = emailError != null && emailError !== '';
  let passwordHasError = passwordError != null && passwordError !== '';
  let submitDisabled =  !username || !email || !password || !recaptchaToken || isSubmitting;

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (submitDisabled) {
      return;
    }

    setIsSubmitting(true);

    // TODO: implement TOS version acceptance
    accountApi.createAccount({ username: username, password: password, email: email, acceptedTosVersion: 1, recaptcha_response: recaptchaToken as string })
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
          <title>{ isSubmitting ? 'ZapMe - Signing up...' : 'ZapMe - Sign up' }</title>
        </Helmet>
        <TextField name="uname" label="Username" variant="standard" disabled={isSubmitting} error={usernameHasError} helperText={usernameError} onChange={dispatch} sx={{mb:2}} />
        <TextField name="email" label="Email" variant="standard" disabled={isSubmitting} error={emailHasError} helperText={emailError} onChange={dispatch} sx={{mb:2}}/>
        <TextField name="passw" label="Password" variant="standard" disabled={isSubmitting} error={passwordHasError} helperText={passwordError} onChange={dispatch} type="password" sx={{mb:2}}/>
        <ReCAPTCHA sitekey={RecaptchaSiteKey} onChange={setRecaptchaToken} onExpired={() => setRecaptchaToken(null)} />
        <Button color="primary" variant="contained" disabled={submitDisabled} onClick={handleSubmit} type="submit" sx={{mt:2}}> Sign Up </Button>
      </Paper>
  );
}

export default SignUpPage;
import { ApiError } from "./ApiError";
import { AccountApiFactory } from "./generated/api";

const accountApi = AccountApiFactory(
  undefined,
  import.meta.env.VITE_BACKEND_URL
);


export interface RegisterAccountResponse {
  ok: boolean;
  error?: ApiError;
}

export async function registerAccount(
  username: string,
  password: string,
  email: string,
  acceptedTosVersion: number,
  recaptchaResponse: string
): Promise<RegisterAccountResponse> {
  try {
    await accountApi.createAccount({
      username,
      password,
      email,
      acceptedTosVersion,
      recaptcha_response: recaptchaResponse,
    });

    return { ok: true };
  }
  catch (exception: any) {
    return {
      ok: false,
      error: new ApiError(exception),
    };
  }
}
export async function requestPasswordReset(email: string, recaptchaResponse: string): Promise<ApiError | null> {
  try {
    await accountApi.accountRecoveryRequest({email, recaptcha_response: recaptchaResponse});
    return null;
  }
  catch (exception: any) {
    return new ApiError(exception);
  }
}
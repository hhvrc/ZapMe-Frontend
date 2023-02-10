import { AccountApiFactory, type ErrorDetails } from "./generated/api";

const accountApi = AccountApiFactory(
  undefined,
  import.meta.env.VITE_BACKEND_URL
);


export interface RegisterAccountResponse {
  ok: boolean;
  error?: ErrorDetails;
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
  catch (error: any) {
    const response = error?.response;

    if (!response?.data) {
      throw error;
    }

    return {
      ok: false,
      error: response.data as ErrorDetails,
    };
  }
}
export async function requestPasswordReset(email: string, recaptchaResponse: string): Promise<void> {
  await accountApi.accountRecoveryRequest({email, recaptcha_response: recaptchaResponse});
}
import type SessionInfo from "src/models/SessionInfo";
import { getBrowserName } from "../utils/browserUtils";
import { AuthenticationApiFactory, type ErrorDetails } from "./generated/api";

const authApi = AuthenticationApiFactory(
  undefined,
  import.meta.env.VITE_BACKEND_URL
);

export interface AuthLoginResponse {
  sessionInfo?: SessionInfo;
  error?: ErrorDetails;
}

export async function authLogin(
  username: string,
  password: string,
  rememberMe: boolean
): Promise<AuthLoginResponse> {
  try {
    const response = await authApi.authSignIn({
      username,
      password,
      rememberMe,
      sessionName: getBrowserName(),
    });

    const data = response.data;

    return {
      sessionInfo: {
        id: data.sessionId!,
        issuedAt: new Date(data.issuedAtUtc!),
        expiresAt: new Date(data.expiresAtUtc!),
      },
    };
  } catch (error: any) {
    const response = error?.response;

    if (!response?.data) {
      throw error;
    }

    return {
      error: response.data as ErrorDetails,
    };
  }
}

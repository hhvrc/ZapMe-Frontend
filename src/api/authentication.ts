import { AuthenticationApiFactory } from "./generated/api";
import { SessionTokenStore } from "../stores";
import { ApiError } from "./ApiError";

const authApi = AuthenticationApiFactory(
  undefined,
  import.meta.env.VITE_BACKEND_URL
);

export async function authLogin(
  username: string,
  password: string,
  rememberMe: boolean
): Promise<ApiError | null> {
  try {
    const response = await authApi.authSignIn({
      username,
      password,
      rememberMe
    });

    if (!response.data) {
      // TODO: Improve error handling
      throw new Error("No data returned from server");
    }

    const { sessionId, issuedAtUtc, expiresAtUtc } = response.data;

    if (!sessionId || !issuedAtUtc || !expiresAtUtc) {
      // TODO: Improve error handling
      throw new Error("Invalid data returned from server");
    }

    SessionTokenStore.set({
      id: sessionId,
      issuedAt: new Date(issuedAtUtc),
      expiresAt: new Date(expiresAtUtc),
    });

    return null;
  } catch (exception: any) {
    return new ApiError(exception);
  }
}

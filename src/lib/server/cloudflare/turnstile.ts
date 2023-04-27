import { TURNSTILE_SECRET_KEY } from '$env/static/private';

interface TurnstileResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  'error-codes': (
    | 'missing-input-secret'
    | 'invalid-input-secret'
    | 'missing-input-response'
    | 'invalid-input-response'
    | 'bad-request'
    | 'timeout-or-duplicate'
    | 'internal-error'
  )[];
  action: string;
  cdata: string;
}
interface TurnstileOk {
  success: true;
  challenge_ts: string;
  hostname: string;
  action: string;
  cdata: string;
}
interface TurnstileError {
  success: false;
  message: 'missing-token' | 'invalid-token' | 'timeout-or-duplicate';
}

// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
async function ValidateToken(
  body: FormData,
  headers: Headers
): Promise<TurnstileOk | TurnstileError> {
  // Turnstile injects a token in "cf-turnstile-response".
  const token = body.get('cf-turnstile-response')?.toString();
  if (!token) {
    return { success: false, message: 'missing-token' };
  }

  const ip = headers.get('CF-Connecting-IP')?.toString();
  if (!ip) {
    throw new Error('CF-Connecting-IP header not set');
  }

  // Validate the token by calling the
  // "/siteverify" API endpoint.
  const formData = new FormData();
  formData.append('secret', TURNSTILE_SECRET_KEY);
  formData.append('response', token);
  formData.append('remoteip', ip);

  let retry = false;
  let retryCount = 0;
  let outcome: TurnstileResponse;
  do {
    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const result = await fetch(url, {
      body: formData,
      method: 'POST',
    });

    outcome = (await result.json()) as TurnstileResponse;

    if (!outcome.success) {
      // If we got a error without error-codes, it's an internal error.
      const errorCodes = outcome['error-codes'];
      if (!errorCodes || errorCodes.length === 0) {
        throw new Error('Turnstile API returned an error without error-codes');
      }

      // Process the error-codes.
      switch (errorCodes[0]) {
        case 'internal-error':
          if (retryCount++ >= 3) {
            throw new Error('Turnstile API returned an internal-error');
          }
          retry = true;
          break;
        case 'bad-request':
        case 'missing-input-secret':
        case 'invalid-input-secret':
          throw new Error('Turnstile reports that the secret key is invalid');
        case 'missing-input-response':
          return { success: false, message: 'missing-token' };
        case 'invalid-input-response':
          return { success: false, message: 'invalid-token' };
        case 'timeout-or-duplicate':
          return { success: false, message: 'timeout-or-duplicate' };
        default:
          throw new Error(
            'Turnstile API returned an unknown error-code: ' + errorCodes[0]
          );
      }
    }
  } while (retry);

  return {
    success: true,
    challenge_ts: outcome.challenge_ts,
    hostname: outcome.hostname,
    action: outcome.action,
    cdata: outcome.cdata,
  };
}

export { type TurnstileOk, type TurnstileError, ValidateToken };

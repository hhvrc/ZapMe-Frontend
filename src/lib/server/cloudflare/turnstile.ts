import { TURNSTILE_SECRET_KEY } from '$env/static/private';

type TurnStileErrorCode
    = 'missing-input-secret'
    | 'invalid-input-secret'
    | 'missing-input-response'
    | 'invalid-input-response'
    | 'bad-request'
    | 'timeout-or-duplicate'
    | 'internal-error';

interface TurnstileResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes': TurnStileErrorCode[];
  action?: string;
  cdata?: string;
}

// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
async function ValidateToken(
  body: FormData,
  headers: Headers
): Promise<TurnstileResponse> {
  // Turnstile injects a token in "cf-turnstile-response".
  const token = body.get('cf-turnstile-response')?.toString();
  if (!token) {
    return { success: false, 'error-codes': ['missing-input-response'] };
  }

  const ip = headers.get('CF-Connecting-IP')?.toString();
  if (!ip) {
    console.error('CF-Connecting-IP header is missing');
    return { success: false, 'error-codes': ['bad-request'] };
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
        return { success: false, 'error-codes': ['internal-error'] };
      }

      retry = errorCodes.includes('internal-error') && retryCount++ < 3;
    }
  } while (retry);

  return outcome;
}

function TurnstileUserErrorMessage(response: TurnstileResponse): string {
  if (response.success) {
    return 'Success';
  }

  const errorCodes = response['error-codes'];
  if (errorCodes.includes('internal-error')) {
    return 'Internal Server Error';
  }
  let message;
  switch (errorCodes[0]) {
    case 'missing-input-response':
      message = 'Missing turnstile response';
      break;
    case 'invalid-input-response':
      message = 'Invalid turnstile response';
      break;
    case 'bad-request':
      message = 'Bad request';
      break;
    default:
      message = 'Unknown error';
      break;
  }
  return message;
}

export { ValidateToken, TurnstileUserErrorMessage, type TurnstileResponse };

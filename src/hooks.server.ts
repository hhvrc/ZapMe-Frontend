const CORS_HEADERS = {
  Origin: 'https://google.com, https://cloudflareinsights.com',
  Methods: '*',
  Headers: '*',
};

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  if (event.url.pathname.startsWith('/api/')) {
    // We are not supposed to get these requests on the server
    return new Response(
      'Your API call hit the frontend server, this is not supposed to happen... 🤔',
      { status: 404 }
    );
  }

  const response = await resolve(event);

  // Options request, handle in different function
  if (event.request.method === 'OPTIONS') {
    return handleOptions(event);
  }

  response.headers.append('Access-Control-Allow-Origin', CORS_HEADERS.Origin);

  return response;
}

async function handleOptions(event) {
  const headers = {
    'Access-Control-Allow-Origin': CORS_HEADERS.Origin,
    'Access-Control-Allow-Methods': CORS_HEADERS.Methods,
    'Access-Control-Allow-Headers': CORS_HEADERS.Headers,
  };

  // Add CORS for ReCAPTCHA
  return new Response(null, { headers });
}

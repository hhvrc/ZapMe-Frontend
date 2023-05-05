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

  response.headers.append('Access-Control-Allow-Origin', `https://google.com`);

  return response;
}

async function handleOptions(event) {
  const headers = {
    'Access-Control-Allow-Origin': 'https://google.com',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  };

  // Add CORS for ReCAPTCHA
  return new Response(null, { headers });
}

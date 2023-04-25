interface PageParams {
  token?: string;
  error?: string;
}

export const prerender = false;
export function load({ url }): PageParams {
  const token = url.searchParams.get('token');
  if (!token) {
    return {
      error: 'Looks like the link is broken. Please try again.',
    };
  }

  return {
    token,
  };
}
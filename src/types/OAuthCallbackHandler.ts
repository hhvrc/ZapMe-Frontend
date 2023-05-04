import type { Cookies } from "@sveltejs/kit";

export type OAuthCallbackHandler = (cookies: Cookies, url: URL) => Promise<Response>;
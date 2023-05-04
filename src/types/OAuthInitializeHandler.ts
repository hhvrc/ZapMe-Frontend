import type { Cookies } from "@sveltejs/kit";

export type OAuthInitializeHandler = (cookies: Cookies, url: URL) => Promise<Response>;
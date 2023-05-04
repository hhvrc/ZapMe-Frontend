import type { SupportedOAuthProviders } from "$types"
import type { OAuthInitializeHandler, OAuthCallbackHandler } from "$types";
import { handleDiscordOAuthCallback, handleDiscordOAuthInitialize } from "./discord";
import { handleGithubOAuthCallback, handleGithubOAuthInitialize } from "./github";
import { handleGoogleOAuthCallback, handleGoogleOAuthInitialize } from "./google";
import { handleTwitterOAuthCallback, handleTwitterOAuthInitialize } from "./twitter";

export const OAuthHandlers: SupportedOAuthProviders<{ initialize: OAuthInitializeHandler, callback: OAuthCallbackHandler }> = {
  discord: { initialize: handleDiscordOAuthInitialize, callback: handleDiscordOAuthCallback },
  github: { initialize: handleGithubOAuthInitialize, callback: handleGithubOAuthCallback },
  google: { initialize: handleGoogleOAuthInitialize, callback: handleGoogleOAuthCallback },
  twitter: { initialize: handleTwitterOAuthInitialize, callback: handleTwitterOAuthCallback }
}
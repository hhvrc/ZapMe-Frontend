/// <reference types="svelte" />
/// <reference types="vite/client" />

declare global {
  interface Window {
    grecaptcha: ReCaptchaInstance | undefined;
    grecaptchaSuccessCallback: (token: string) => void;
    grecaptchaExpiredCallback: () => void;
    grecaptchaErrorCallback: () => void;
  }
}

interface ReCaptchaInstance {
  execute: (siteKey: string, options: ReCaptchaExecuteOptions) => Promise<string>
  getResponse: (widgetId: number) => string
  ready: (cb: () => any) => void
  render: (id: string, options: ReCaptchaRenderOptions) => any
  reset: (widgetId: number) => void
}

interface ReCaptchaExecuteOptions {
  action: string
}

interface ReCaptchaRenderOptions {
  sitekey: string
  size: 'invisible'
}

export {};
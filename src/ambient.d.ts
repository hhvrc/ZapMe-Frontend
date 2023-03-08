/// <reference types="svelte" />
/// <reference types="vite/client" />

declare global {
  interface Window {
    grecaptcha: any;
    handleCaptchaCallback: (token: string) => Promise<void>;
    resetCaptcha: () => void;
    handleCaptchaError: () => void;
  }
}

export {};
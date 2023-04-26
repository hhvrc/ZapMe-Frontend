/// <reference types="svelte" />
/// <reference types="vite/client" />
import type { TurnstileInstance } from '$types/TurnstileInstance';

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }
  interface Window {
    turnstile: TurnstileInstance | undefined;
  }
}

export {};

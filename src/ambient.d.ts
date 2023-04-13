/// <reference types="svelte" />
/// <reference types="vite/client" />

declare global {
  interface Window {
    turnstile: TurnstileInstance | undefined;
  }
}

interface TurnstileInstance {
  execute: (container: string | HTMLElement, jsParams: TurnstileRenderParameters) => Promise<string>
  getResponse: (container: string | HTMLElement) => string
  implicitRender: () => void
  ready: (callback: (token: string) => void) => void
  remove: (container: string | HTMLElement) => void
  render: (container: string | HTMLElement, parameters: TurnstileRenderParameters) => void
  reset: (container: string | HTMLElement) => void
}

interface TurnstileRenderParameters {
  sitekey: string
  action?: string
  cData?: string
  callback?: (token: string) => void
  'error-callback'?: () => void
  execution?: 'render' | 'execute'
  'expired-callback'?: () => void
  theme?: 'light' | 'dark' | 'auto'
  language?: 'auto' | 'ar-eg' | 'de' | 'en' | 'es' | 'fa' | 'fr' | 'id' | 'it' | 'ja' | 'ko' | 'nl' | 'pl' | 'pt-br' | 'ru' | 'tr' | 'zh-cn' | 'zh-tw'
  tabindex?: number
  'timeout-callback'?: () => void
  'response-field'?: string
  'response-field-name'?: string
  size?: 'normal' | 'compact'
  retry?: 'auto' | 'never'
  'retry-interval'?: number
  'refresh-expired'?: 'auto' | 'manual' | 'never'
  'apperance'?: 'always' | 'execute' | 'interaction-only'
}

export {};
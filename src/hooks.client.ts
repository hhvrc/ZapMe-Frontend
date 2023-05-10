import {
  PUBLIC_SENTRY_DSN,
  PUBLIC_SENTRY_TRACES_SAMPLERATE,
  PUBLIC_REPLAYS_SESSION_SAMPLERATE,
  PUBLIC_REPLAYS_ONERROR_SAMPLERATE,
} from '$env/static/public';
import { BrowserTracing, Replay } from '@sentry/browser';
import {
  init as SentryInit,
  captureException as SentryCaptureException,
} from '@sentry/svelte';

// Initialize Sentry for error and performance monitoring
SentryInit({
  dsn: PUBLIC_SENTRY_DSN,
  integrations: [new BrowserTracing(), new Replay()],
  tracesSampleRate: parseFloat(PUBLIC_SENTRY_TRACES_SAMPLERATE),
  replaysSessionSampleRate: parseFloat(PUBLIC_REPLAYS_SESSION_SAMPLERATE),
  replaysOnErrorSampleRate: parseFloat(PUBLIC_REPLAYS_ONERROR_SAMPLERATE),
});

export function handleError(error) {
  console.error(error);
  SentryCaptureException(error);
}

import { init as SentryInit, captureException as SentryCaptureException } from "@sentry/svelte";
import { BrowserTracing } from '@sentry/browser';

// Initialize Sentry for error and performance monitoring
const sentryDsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;
const sentryTracesSampleRate = import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE as number | undefined;
if (sentryDsn && sentryTracesSampleRate) {
  SentryInit({
    dsn: sentryDsn,
    integrations: [new BrowserTracing()],
    tracesSampleRate: sentryTracesSampleRate,
  });
}

export function handleError(error: any) {
  console.error(error);
  if (sentryDsn && sentryTracesSampleRate) {
    SentryCaptureException(error);
  }
}
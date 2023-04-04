import * as Sentry from "@sentry/svelte";
import { BrowserTracing } from "@sentry/tracing";

// Initialize Sentry for error and performance monitoring
const sentryDsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;
const sentryTracesSampleRate = import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE as number | undefined;
if (sentryDsn && sentryTracesSampleRate) {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [new BrowserTracing()],
    tracesSampleRate: sentryTracesSampleRate,
  });
}

// Fetch API configuration


export function handleError(error: any) {
  console.error(error);
  if (sentryDsn && sentryTracesSampleRate) {
    Sentry.captureException(error);
  }
}
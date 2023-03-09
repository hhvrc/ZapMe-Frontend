import * as Sentry from "@sentry/svelte";
import { BrowserTracing } from "@sentry/tracing";

const sentryDsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;
const sentryTracesSampleRate = import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE as number | undefined;

if (sentryDsn && sentryTracesSampleRate) {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [new BrowserTracing()],
    tracesSampleRate: sentryTracesSampleRate,
  });
}
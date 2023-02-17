import "./global.css";
import App from './App.svelte';

import * as Sentry from "@sentry/svelte";
import { BrowserTracing } from "@sentry/tracing";

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
const sentryTracesSampleRate = import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE;

if (sentryDsn && sentryTracesSampleRate) {
  Sentry.init({
    dsn: sentryDsn as string,
    integrations: [new BrowserTracing()],
    tracesSampleRate: sentryTracesSampleRate as number,
  });
}

const app = new App({
  target: document.body,
});

export default app;

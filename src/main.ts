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

const body = document.body;

// Remove all children from the body
while (body.firstChild) {
  body.removeChild(body.firstChild);
}

// Create a new div to mount the app
const app = new App({
  target: body,
});

export default app;

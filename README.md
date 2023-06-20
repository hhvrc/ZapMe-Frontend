# ZapMe

ZapMe is an open-source frontend application for the ZapMe project.

## Building

### Prerequisites

- [Node.js](https://nodejs.org/en/) (16.14.2 or higher)
- [npm](https://www.npmjs.com/) (v8.11.0 or higher)
- [java](https://www.java.com/en/) (v11.0.16.1 or higher)

### Environment variables

To configure the application, create a .env.local file in the root directory of the project and define the following environment variables:

| Variable                    | Description                                                                               |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| `PUBLIC_SENTRY_DSN`         | The DSN for the [Sentry](https://sentry.io/) service.                                     |
| `PUBLIC_TURNSTILE_SITE_KEY` | The site key for the [Turnstile](https://www.cloudflare.com/products/turnstile/) service. |

### Building

```bash
npm i

npm run build
```

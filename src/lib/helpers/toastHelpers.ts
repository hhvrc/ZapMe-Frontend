import { browser } from '$app/environment';
import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

function createToastImpl(toast: ToastSettings) {
  if (!browser) return;
  toastStore.trigger(toast);
}
function createHtmlMessage(title: string, message: string): string {
  return `<h4>${title}</h4><p>${message}</p>`;
}
export function createInfoToast(title: string, message: string|null|undefined = undefined) {
  if (!message) return;
  createToastImpl({
    message: !message ? title : createHtmlMessage(title, message),
    autohide: true,
    timeout: 5000,
    background: 'variant-filled-info',
  });
}
export function createErrorToast(title: string, message: string|null|undefined = undefined) {
  createToastImpl({
    message: !message ? title : createHtmlMessage(title, message),
    autohide: true,
    timeout: 5000,
    background: 'variant-filled-error',
  });
}

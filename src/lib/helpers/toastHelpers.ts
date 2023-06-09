import { browser } from '$app/environment';
import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

function createToastImpl(toast: ToastSettings) {
  if (!browser) return;
  toastStore.trigger(toast);
}
export function createSuccessToast(message: string, timeout = 5000) {
  if (!message) return;
  createToastImpl({
    message,
    autohide: true,
    timeout,
    background: 'variant-filled-success',
  });
}
export function createErrorToast(message: string, timeout = 5000) {
  createToastImpl({
    message,
    autohide: true,
    timeout,
    background: 'variant-filled-error',
  });
}

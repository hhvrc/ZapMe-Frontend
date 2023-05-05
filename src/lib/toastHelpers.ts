import { browser } from '$app/environment';
import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

function createToastImpl(toast: ToastSettings) {
  if (!browser) return;
  toastStore.trigger(toast);
}
export function createErrorToast(message: string) {
  createToastImpl({
    message,
    autohide: true,
    timeout: 5000,
    background: 'variant-filled-error',
  });
}

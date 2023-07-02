import FileModal from './FileModal.svelte';
import type { ModalComponent } from '@skeletonlabs/skeleton';

// https://www.skeleton.dev/utilities/modals#component-modals
export const modalComponentRegistry: Record<string, ModalComponent> = {
  file: { ref: FileModal },
};

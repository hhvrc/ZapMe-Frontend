import FileModal from './FileModal.svelte';
import GiphyModal from './GiphyModal.svelte';
import TenorModal from './TenorModal.svelte';
import type { ModalComponent } from '@skeletonlabs/skeleton';

// https://www.skeleton.dev/utilities/modals#component-modals
export const modalComponentRegistry: Record<string, ModalComponent> = {
  file: { ref: FileModal },
  giphy: { ref: GiphyModal },
  tenor: { ref: TenorModal },
};

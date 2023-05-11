<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";
  import StatusIndicator from "./StatusIndicator.svelte";

  export let initials: string|undefined = undefined;
  export let src: string|undefined = undefined;
  export let fallback: string|undefined = undefined;
  export let onlineStatus: 'online' | 'doNotDisturb' | 'inactive' | 'downBad' | 'offline';
  export let scale: 'small' | 'medium' | 'large';

  let size: '32px' | '80px' | '120px';
  $: size = scale === 'small' ? '32px' : scale === 'medium' ? '80px' : '120px';
  $: width = `w-[${size}]`;
  $: height = `h-[${size}]`;
  $: dimensions = width + ' ' + height;
</script>

<div class={"relative " + dimensions}>
  <Avatar {initials} {src} {fallback} rounded="rounded-full" {width} />
  <div class="status-indicator">
    <StatusIndicator {onlineStatus} {scale} />
  </div>
</div>

<style lang="postcss">
  .status-indicator {
    @apply absolute bottom-0 right-0 rounded-full ring-4 ring-slate-800;
  }
</style>
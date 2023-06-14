<script lang="ts">
  export let onlineStatus:
    | 'online'
    | 'doNotDisturb'
    | 'inactive'
    | 'offline';
  export let scale: 'small' | 'medium' | 'large';

  /*
    TODO: The indicator's cutout does not adapt to its background color.
  */
</script>

<span class={onlineStatus + ' ' + scale} />

<style lang="postcss">
  span {
    @apply block rounded-full;
  }
  span.small {
    width: 10px;
    height: 10px;
    --imgSize: 32px;
    --detailSize: 6px;
  }
  span.medium {
    width: 16px;
    height: 16px;
    --imgSize: 80px;
    --detailSize: 10px;
  }
  span.large {
    width: 24px;
    height: 24px;
    --imgSize: 120px;
    --detailSize: 15px;
  }
  span.downBad {
    @apply bg-purple-500;
  }
  span.online {
    @apply bg-green-500;
  }
  span.doNotDisturb {
    @apply bg-red-500;
  }
  span.inactive {
    @apply bg-yellow-500;
  }
  span.offline {
    @apply bg-gray-500;
  }
  span.doNotDisturb:after {
    content: '';
    width: var(--detailSize);
    @apply absolute left-1/2 top-1/2 h-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface-100-800-token;
  }
  span.inactive:after {
    content: '';
    height: var(--detailSize);
    width: var(--detailSize);
    @apply absolute left-0 top-0 rounded-full bg-surface-100-800-token;
  }
  span.offline:after {
    content: '';
    height: var(--detailSize);
    width: var(--detailSize);
    @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-surface-100-800-token;
  }
</style>

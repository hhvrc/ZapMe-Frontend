<script lang="ts">
  export let onlineStatus: 'online' | 'doNotDisturb' | 'inactive' | 'downBad' | 'offline';
  export let scale: 'small' | 'medium' | 'large';
</script>

<span class={onlineStatus + " " + scale}/>

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
    @apply h-[2px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black;
  }
  span.inactive:after {
    content: '';
    height: var(--detailSize);
    width: var(--detailSize);
    @apply absolute top-0 left-0 rounded-full bg-slate-800;
  }
  span.offline:after {
    content: '';
    height: var(--detailSize);
    width: var(--detailSize);
    @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-800;
  }
</style>
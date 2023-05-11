<script lang="ts">
  export let imageUrl: string;
  export let imageAlt: string;
  export let onlineStatus: 'online' | 'doNotDisturb' | 'inactive' | 'downBad' | 'offline';
</script>

<div>
  <img id={onlineStatus} src={imageUrl} alt={imageAlt} />
  <span id={onlineStatus}/>
</div>

<style lang="postcss">
  div {
    @apply relative;
  }
  img {
    @apply h-[32px] w-[32px] rounded-full;
  }
  span {
    @apply absolute bottom-0 right-0
      h-[10px] w-[10px]
      rounded-full ring-4 ring-slate-800;
  }
  span#online {
    @apply bg-green-400;
  }
  span#doNotDisturb {
    @apply bg-red-400;
  }
  span#doNotDisturb:after {
    content: '';
    @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      h-[2px] w-[6px] rounded-full
      bg-red-600;
  }
  span#inactive {
    @apply bg-yellow-400;
  }
  span#inactive:after {
    content: '';
    @apply absolute top-0 left-0
      h-[6px] w-[6px] rounded-full
      bg-slate-800;
  }
  span#downBad {
    @apply bg-purple-400;
  }
  span#downBad:after {
    content: '';
    @apply absolute top-0 left-0
      h-[6px] w-[6px] rounded-full
      bg-slate-800;
  }
  span#offline {
    @apply bg-gray-400;
  }
  span#offline:after {
    content: '';
    @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      h-[6px] w-[6px] rounded-full
      bg-gray-800;
  }
</style>
<script lang="ts">
  let className = '';
  export { className as class };
  export let onlineStatus: 'online' | 'doNotDisturb' | 'inactive' | 'offline';
  export let scale: 'small' | 'medium' | 'large';
</script>

{#if scale === 'small'}
  <span id={onlineStatus} class={className + ' small'} />
{:else if scale === 'medium'}
  <span id={onlineStatus} class={className + ' medium'} />
{:else if scale === 'large'}
  <span id={onlineStatus} class={className + ' large'} />
{/if}

<style lang="postcss">
  *::before {
    content: '';
    @apply block rounded-full;
  }
  *::after {
    @apply absolute block rounded-full bg-inherit;
  }

  #online::before {
    @apply bg-green-500;
  }

  #doNotDisturb::before {
    @apply bg-red-500;
  }
  #doNotDisturb::after {
    content: '';
    @apply left-1/2 top-1/2 h-[2px] -translate-x-1/2 -translate-y-1/2;
  }

  #inactive::before {
    @apply bg-yellow-500;
  }
  #inactive::after {
    content: '';
    @apply left-0 top-0;
  }

  #offline::before {
    @apply bg-gray-500;
  }
  #offline::after {
    content: '';
    @apply left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
  }

  .small::before {
    @apply h-[10px] w-[10px];
  }
  .small::after {
    @apply h-[6px] w-[6px];
  }

  .medium::before {
    @apply h-[16px] w-[16px];
  }
  .medium::after {
    @apply h-[10px] w-[10px];
  }

  .large::before {
    @apply h-[24px] w-[24px];
  }
  .large::after {
    @apply h-[15px] w-[15px];
  }
</style>

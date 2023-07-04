<div id="banner" class="placeholder animate-pulse rounded-none" />
<div id="header">
  <div id="avatar" class="bg-surface-100-800-token border-surface-100-800-token">
    <div id="banner" class="placeholder animate-pulse" />
    <div
      class="placeholder !absolute bottom-0 right-0 !h-6 !w-6 animate-pulse rounded-full border-4 border-surface-100-800-token"
    />
  </div>
  <div class="h-full w-full overflow-hidden">
    <div class="flex flex-col gap-2">
      <div class="placeholder h-6 w-1/2 animate-pulse" />
      <div class="placeholder h-6 w-1/3 animate-pulse" />
    </div>
  </div>
</div>
<div id="content" class="mbg-surface-50-900-token">
  <div class="flex flex-col gap-3 py-3">
    <div class="placeholder h-4 w-1/2 animate-pulse" />
    <div class="placeholder h-4 w-1/3 animate-pulse" />
  </div>
</div>

<style lang="postcss">
  #banner {
    @apply relative h-32 w-full select-none outline-none;
  }
  #avatar {
    @apply relative -top-[60px] mr-1 h-[128px] w-[128px] select-none rounded-full border-4;
  }
  #avatar div {
    @apply relative h-[120px] w-[120px] rounded-full outline-none;
  }
  #header {
    @apply flex h-20 justify-end px-4 py-2;
  }
  #content {
    @apply m-4 mt-1 overflow-hidden rounded-lg px-2;
  }
</style>

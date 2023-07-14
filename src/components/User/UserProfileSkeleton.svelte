<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton';
  import StatusIndicator from '$components/StatusIndicator.svelte';
  import type { AccountDto, UserDto } from '$lib/api';
  import { GetUsernameInitials } from '$lib/utils/initials';

  export let user: AccountDto | UserDto;

  export let bannerClickHandler: (() => void) | undefined = undefined;
  export let avatarClickHandler: (() => void) | undefined = undefined;

  $: initials = GetUsernameInitials(user.username);
  $: bannerUrl =
    user.bannerUrl ??
    'https://i.pinimg.com/originals/31/c3/e3/31c3e3f032a177d0b0c983b8262de8f9.gif';
  $: avatarUrl =
    user.avatarUrl ??
    'https://i.pinimg.com/originals/49/07/13/4907130d5ddcd50beff46f78c9744a49.png';
</script>

<!-- Profile banner -->
{#if bannerClickHandler}
  <div
    id="banner"
    role="button"
    tabindex="-1"
    class="group cursor-pointer"
    on:mousedown={bannerClickHandler}
  >
    <img
      src={bannerUrl}
      alt="ProfileBanner"
      class="transition-brightness group-hover:brightness-50"
    />
    <p class="opacity-0 transition-opacity group-hover:opacity-100">Change banner</p>
  </div>
{:else}
  <div id="banner" class="group">
    <img src={bannerUrl} alt="ProfileBanner" />
  </div>
{/if}

<div id="header">
  <!-- Profile avatar -->
  <div id="avatar" class="bg-surface-100-800-token border-surface-100-800-token">
    {#if avatarClickHandler}
      <div
        role="button"
        tabindex="-1"
        class="group cursor-pointer"
        on:mousedown={avatarClickHandler}
      >
        <Avatar
          {initials}
          src={avatarUrl}
          rounded="rounded-full"
          width="w-[120px]"
          class="transition-brightness group-hover:brightness-50"
        />
        <p class="opacity-0 transition-opacity group-hover:opacity-100">Change avatar</p>
      </div>
    {:else}
      <div class="group">
        <Avatar {initials} src={avatarUrl} rounded="rounded-full" width="w-[120px]" />
      </div>
    {/if}
    <StatusIndicator
      onlineStatus={user.status}
      scale="large"
      class="bg-surface-100-800-token border-surface-100-800-token absolute bottom-0 right-0 rounded-full border-4"
    />
  </div>

  <div class="h-full w-full overflow-hidden">
    <slot name="header" />
  </div>
</div>
<div class="bg-surface-50-900-token m-4 mt-1 overflow-hidden rounded-lg px-2">
  <slot />
</div>

<style lang="postcss">
  #banner {
    @apply relative h-32 w-full select-none outline-none;
  }
  #banner img {
    @apply h-32 w-full object-cover;
  }
  #avatar {
    @apply relative -top-[60px] mr-1 h-[128px] w-[128px] select-none rounded-full border-4;
  }
  #avatar div {
    @apply relative h-[120px] w-[120px] rounded-full outline-none;
  }
  #banner p,
  #avatar div p {
    @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-center text-xl font-medium uppercase text-white;
  }
  #header {
    @apply flex h-20 justify-end px-4 py-2;
  }
</style>

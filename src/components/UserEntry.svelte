<script lang="ts">
  import ProfilePicture from "$components/ProfilePicture.svelte";
  import { UserStatus } from "$lib/api";
  import { GetUsernameInitials } from "$lib/utils/initials";

  export let name: string;
  export let imageUrl: string;
  export let onlineStatus: UserStatus;
  export let onlineStatusText: string;
  export let scale: 'small' | 'medium' | 'large';

  let statusText: string;
  $: {
    if (onlineStatusText && onlineStatusText.length > 0) {
      statusText = onlineStatusText;
    } else {
      switch (onlineStatus) {
        case UserStatus.doNotDisturb:
          statusText = "Do not disturb";
          break;
        case UserStatus.inactive:
          statusText = "Inactive";
          break;
        case UserStatus.online:
          statusText = "Online";
          break;
        case UserStatus.downBad:
          statusText = "Down bad";
          break;
        case UserStatus.offline:
        default:
          statusText = "Offline";
          break;
      }
    }
  }

  $: initials = GetUsernameInitials(name);
</script>

<li class={scale}>
  <ProfilePicture src={imageUrl} {initials} {onlineStatus}  {scale} />
  <div class="ml-2">
    <p class="name">{name}</p>
    <p class="status">{statusText}</p>
  </div>
</li>

<style lang="postcss">
  li {
    @apply flex items-center select-none hover:bg-slate-700 cursor-pointer;
  }
  li.small {
    @apply h-[42px];
  }
  li.medium {
    @apply h-[92px];
  }
  li.large {
    @apply h-[132px];
  }
  .name {
    @apply text-lg text-white;
  }
  .status {
    @apply text-xs text-gray-400;
  }
</style>
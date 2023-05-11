<script lang="ts">
  import ProfilePicture from "$components/ProfilePicture.svelte";
  import { UserStatus } from "$lib/api";

  export let name: string;
  export let imageUrl: string;
  export let imageAlt: string;
  export let onlineStatus: UserStatus;
  export let onlineStatusText: string;

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
</script>

<li class="h-[42px] flex items-center select-none hover:bg-slate-700 cursor-pointer">
  <ProfilePicture {onlineStatus} {imageUrl} {imageAlt} />
  <div class="ml-2">
    <p class="text-lg text-white leading-5">{name}</p>
    <p class="text-xs text-gray-400">{statusText}</p>
  </div>
</li>
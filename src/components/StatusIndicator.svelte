<script lang="ts">
  export let onlineStatus: 'online' | 'doNotDisturb' | 'inactive' | 'offline';
  export let scale: 'small' | 'medium' | 'large';

  let iconSize: string;
  let iconColor: string;
  let detailSize: string;

  $: switch (scale) {
    case 'small':
      iconSize = 'w-[10px] h-[10px]';
      detailSize = '6px';
      break;
    case 'medium':
      iconSize = 'w-[16px] h-[16px]';
      detailSize = '10px';
      break;
    case 'large':
      iconSize = 'w-[24px] h-[24px]';
      detailSize = '15px';
      break;
    default:
      iconSize = 'w-[16px] h-[16px]';
      detailSize = '10px';
      break;
  }
  $: switch (onlineStatus) {
    case 'online':
      iconColor = 'bg-green-500';
      break;
    case 'doNotDisturb':
      iconColor = 'bg-red-500';
      break;
    case 'inactive':
      iconColor = 'bg-yellow-500';
      break;
    case 'offline':
      iconColor = 'bg-gray-500';
      break;
    default:
      iconColor = 'bg-gray-500';
      break;
  }
</script>

<span class={`block rounded-full ${iconSize} ${iconColor}`} />
{#if onlineStatus == 'doNotDisturb'}
  <span
    class={`absolute left-1/2 top-1/2 h-[2px] -translate-x-1/2 -translate-y-1/2 w-[${detailSize}] rounded-full bg-inherit`}
  />
{:else if onlineStatus == 'inactive'}
  <span
    class={`absolute left-0 top-0 h-[${detailSize}] w-[${detailSize}] rounded-full bg-inherit`}
  />
{:else if onlineStatus == 'offline'}
  <span
    class={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[${detailSize}] w-[${detailSize}] rounded-full bg-inherit`}
  />
{/if}

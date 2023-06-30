<script lang="ts">
  import UserProfileSkeleton from './UserProfileSkeleton.svelte';
  import { goto } from '$app/navigation';
  import {
    AcceptFriendRequest,
    BlockUser,
    DeleteFriendRequest,
    SendFriendRequest,
    UnblockUser,
    UnfriendUser,
  } from '$lib/Actions/UserActions';
  import { UserFriendStatus, UserStatus, type UserDto } from '$lib/api';
  import { AccountStore } from '$lib/stores';

  export let user: UserDto;

  let onlineStatusText = 'Offline';
  $: switch (user.status) {
    case UserStatus.doNotDisturb:
      onlineStatusText = 'Do Not Disturb';
      break;
    case UserStatus.inactive:
      onlineStatusText = 'Idle';
      break;
    case UserStatus.online:
      onlineStatusText = 'Online';
      break;
    case UserStatus.offline:
    default:
      onlineStatusText = 'Offline';
      break;
  }

  $: account = $AccountStore.account;
</script>

<UserProfileSkeleton {user}>
  <div slot="header" class="flex h-full items-center gap-2">
    {#if user.id !== account?.id}
      {#if user.friendStatus === UserFriendStatus.friends}
        <button
          class="btn btn-sm variant-filled-tertiary"
          on:click={() => goto(`/chat/${user.id}`)}
        >
          Message
        </button>
      {:else if user.friendStatus === UserFriendStatus.blocked}
        <button class="btn btn-sm bg-red-700" on:click={() => UnblockUser(user.id)}>
          Unblock
        </button>
      {:else if user.friendStatus === UserFriendStatus.friendRequestOutgoing}
        <button class="btn btn-sm bg-red-700" on:click={() => DeleteFriendRequest(user.id)}>
          Cancel Friend Request
        </button>
      {:else if user.friendStatus === UserFriendStatus.friendRequestIncoming}
        <button class="btn btn-sm bg-green-600" on:click={() => AcceptFriendRequest(user.id)}>
          Accept Friend Request
        </button>
      {:else if user.friendStatus === UserFriendStatus.none}
        <button class="btn btn-sm bg-green-600" on:click={() => SendFriendRequest(user.id)}>
          Send Friend Request
        </button>
      {/if}
      {#if user.friendStatus !== UserFriendStatus.blocked}
        <button class="btn btn-sm bg-red-700" on:click={() => BlockUser(user.id)}> Block </button>
      {/if}
      {#if user.friendStatus === UserFriendStatus.friends}
        <button class="btn btn-sm bg-red-700" on:click={() => UnfriendUser(user.id)}>
          Unfriend
        </button>
      {/if}
    {/if}
  </div>
  <div>
    <!-- Profile name -->
    <h2 class="text-2xl font-bold">
      {user.nickName ? `${user.nickName} (${user.username})` : user.username}
    </h2>

    <!-- Profile status (place at end center) -->
    <p class="mt-2 text-sm">{onlineStatusText}</p>
  </div>
  <hr class="my-2 !border-t-2" />
  <p class="mt-2 text-sm font-bold uppercase">Last Seen</p>
  <p class="text-sm">{user.lastOnline.toLocaleString()}</p>

  {#if user.friendedAt}
    <p class="mt-2 text-sm font-bold uppercase">Friended at</p>
    <p class="text-sm">{user.friendedAt.toLocaleString()}</p>
  {/if}

  <p class="mt-2 text-sm font-bold uppercase">Member since</p>
  <p class="text-sm">{user.createdAt.toLocaleString()}</p>

  <p class="mt-2 text-sm font-bold uppercase">Notes</p>
  <textarea class="textarea mt-1" rows="4" placeholder="No notes">{user.notes ?? ''}</textarea>
</UserProfileSkeleton>

<script lang="ts">
  import { browser } from '$app/environment';
  import { WebRtcCallingClient } from '$lib/realtime/WebRtcClient';
  import { WebSocketClient } from '$lib/realtime/WebSocketClient';
  import { AccountStore, SessionTokenStore } from '$lib/stores';

  $: loggedIn = !!$SessionTokenStore;
  $: meta = {
    title: loggedIn ? 'ZapMe - Home' : 'ZapMe',
    description:
      'ZapMe allows you to control your Submissives shock collars from anywhere in the world with low latency, realtime networking.',
    image: {
      src: '/logo-512.png',
      alt: 'ZapMe Logo',
    },
  };

  let color = 'bg-red-600';
  let cli: WebSocketClient | null = null;
  $: jwtToken = $SessionTokenStore?.jwtToken;
  $: if (browser && jwtToken) {
    cli = new WebSocketClient(jwtToken);
    console.log('WS Created:', !!cli);
    let rtc = WebRtcCallingClient.Create(cli, 'sessId', 'usrId', [
      'stunServerList',
    ]);
    console.log('RTC Created:', !!rtc);
    cli.onMessageReceived((msg) => (color = msg));
  }
</script>

{#if loggedIn}
  <div>
    <h1>Home</h1>
    <button
      type="button"
      class="btn variant-soft bg-red-400"
      on:mousedown={() => cli?.sendTextMessage('bg-green-500')}
      on:mouseup={() => cli?.sendTextMessage('bg-red-500')}>Send it!</button
    >
    <div class={'h-8 w-8 ' + color} />
  </div>
{:else}
  <div class="m-6">
    <h1 class="text-center">
      <span class="font-normal">
        Take Control of Your Submissives from Anywhere in the World.
      </span>
    </h1>
    <br />
    <h2 class="text-center !font-normal">
      {meta.description}
    </h2>
  </div>
{/if}

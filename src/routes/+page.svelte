<script lang="ts">
  import { browser } from '$app/environment';
  import { WebRtcCallingClient } from '$lib/realtime/WebRtcClient';
  import { WebSocketClient } from '$lib/realtime/WebSocketClient';
  import { SessionTokenStore } from '$lib/stores';

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

  $: jwtToken = $SessionTokenStore?.jwtToken;
  $: if (browser && jwtToken) {
    let cli = new WebSocketClient(jwtToken);
    console.log('WS Created:', !!cli);
    let rtc = WebRtcCallingClient.Create(cli, 'sessId', 'usrId', [
      'stunServerList',
    ]);
    console.log('RTC Created:', !!rtc);
  }
</script>

{#if loggedIn}
  <div>
    <h1>Home</h1>
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

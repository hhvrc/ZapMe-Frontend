<script lang="ts">
  import { ApiConfigStore } from '$lib/stores';

  $: config = $ApiConfigStore;

  const year = new Date().getFullYear();
</script>

{#if config}
  <div class="m-2 flex items-center justify-center sm:justify-between">
    <div>
      Made with
      <span style="color: #e25555;">&#9829;</span>
      by {config.founderSocials.discordUsername}
    </div>
    <div class="hidden lg:block">Copyright ©{year} | All Rights Reserved</div>
    <div class="hidden items-center space-x-2 sm:flex">
      <a href="/privacy-policy" class="select-none" data-sveltekit-preload-data="hover">
        Privacy Policy
      </a>
      <a href="/terms-of-service" class="select-none" data-sveltekit-preload-data="hover">
        Terms of Service
      </a>
    </div>
  </div>
{/if}

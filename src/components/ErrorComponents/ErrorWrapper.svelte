<script lang="ts">
  import type { Response } from "$lib/fetchSingleton";
  import { ExceptionDetails, NetworkErrorDetails, ServerErrorDetails } from "$components/ErrorComponents";
  import LoadingWidget from "$components/LoadingWidget.svelte";

  type T = $$Generic;

  export let request: () => Promise<Response<T>>;
  export let data: T;
</script>

{#await request()}
  <slot name="loading">
    <LoadingWidget />
  </slot>
{:then response}
  {#if response.code == 'ok'}
    {() => data = response.data}
    <slot/>
  {:else if response.code == 'err_network'}
    <slot name="networkError">
      <NetworkErrorDetails />
    </slot>
  {:else if response.status == 404}
    <slot name="notFound">
      <h1>Not found</h1>
    </slot>
  {:else if response.code == 'err_server'}
    <slot name="serverError">
      <ServerErrorDetails error={response} />
    </slot>
  {/if}
{:catch exception}
  <slot name="exceptionError">
    <ExceptionDetails {exception} />
  </slot>
{/await}

<style>
</style>
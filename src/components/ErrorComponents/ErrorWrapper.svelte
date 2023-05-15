<script lang="ts">
  import {
    ExceptionDetails,
    NetworkErrorDetails,
    ServerErrorDetails,
  } from '$components/ErrorComponents';
  import { handleFetchError } from '$lib/helpers/errorDetailsHelpers';
  import type { ApiErrorResponse } from '$types';
  import { ProgressRadial } from '@skeletonlabs/skeleton';

  export let exception: unknown;

  let loaded = false;
  let parsed: ApiErrorResponse | null = null;
  $: {
    loaded = false;
    handleFetchError(exception)
    .then((parsedError) => {
      parsed = parsedError;
    })
    .finally(() => {
      loaded = true;
    });
  }
</script>

{#if !loaded}
  <ProgressRadial />
{:else if !parsed}
  <slot name="exceptionError">
    <ExceptionDetails {exception} />
  </slot>
{:else if parsed.code === 'err_network'}
  <slot name="networkError">
    <NetworkErrorDetails />
  </slot>
{:else if parsed.status === 404}
  <slot name="notFound">
    <h1>Not found</h1>
  </slot>
{:else if parsed.code === 'err_server'}
  <slot name="serverError">
    <ServerErrorDetails error={parsed} />
  </slot>
{/if}

<style>
</style>

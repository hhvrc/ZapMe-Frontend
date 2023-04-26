<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { base } from '$app/paths';
  import { page } from '$app/stores';

  let previousPage: string = base;

  afterNavigate(({ from }) => {
    previousPage = from?.url.pathname || previousPage;
  });
</script>

<div class="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] text-center">
  <div class="text-9xl">{$page.status}</div>
  <div class="big">
    {$page.error?.message ?? 'Something went wrong.'}
    <br>
    <a href={previousPage}>Go back</a>
  </div>
</div>
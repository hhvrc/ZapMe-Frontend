<script lang="ts">
	import { createEventDispatcher } from 'svelte'; 	
	import { onMount, onDestroy } from 'svelte';
	const dispatch = createEventDispatcher();
	
  export let expiresAtUtc: Date;
  
  let nowUtcEpoc = Date.now();
  $: expiresAtUtcEpoc = expiresAtUtc.getTime();
	
  let timer: ReturnType<typeof setInterval> | null = null;
	onMount(() => {
		timer = setInterval(() => {
			nowUtcEpoc = Date.now();
    }, 250);
	});
	onDestroy(() => {
		if (timer) {
			clearInterval(timer);
		}
	})
	
  let seconds: number;
  let minutes: number;
  let hours: number;
  let days: number;

	$: {
    let diffMs = expiresAtUtcEpoc - nowUtcEpoc;
		if (diffMs <= 0 && timer) {
			clearInterval(timer);
      dispatch('expired');

			timer = null;
      nowUtcEpoc = expiresAtUtcEpoc;
      diffMs = 0;
		}

    let diffSeconds = Math.ceil(diffMs / 1000);
    seconds = diffSeconds % 60;

    let diffMinutes = Math.floor(diffSeconds / 60);
    minutes = diffMinutes % 60;

    let diffHours = Math.floor(diffMinutes / 60);
    hours = diffHours % 24;

    days = Math.floor(diffHours / 24);
	}

  $: secondsP2 = seconds.toString().padStart(2, '0');
  $: minutesP2 = minutes.toString().padStart(2, '0');
  $: hoursP2 = hours.toString().padStart(2, '0');
</script>

{#if days > 0}
  {days} days, {hours} hours
{:else if hours > 0}
  {hoursP2}:{minutesP2}:{secondsP2}
{:else if minutes > 0}
  {minutesP2}:{secondsP2}
{:else if seconds > 0}
  00:{secondsP2}
{:else}
  00:00:00
{/if}
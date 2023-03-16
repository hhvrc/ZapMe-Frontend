<script lang="ts">
  export let title = '';
</script>

<form on:submit|preventDefault>
  <h2 class="usn">{title}</h2>
  <slot/>
</form>

<style>
  form{
    width: min(80%, 400px);

    padding: 2rem;
    margin: 1rem;
    border: 2px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    box-shadow: 0 0 40px rgba(8,7,16,0.6);

    background-color: var(--thm-paper);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
  h2{
    margin-bottom: 10px;
  }
</style>
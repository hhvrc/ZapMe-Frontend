<script lang="ts">
  export let title = '';
</script>

<div>
  <form on:submit|preventDefault>
    <h2 class="usn">{title}</h2>
    <slot/>
  </form>
</div>

<style>
  form{
    position: absolute;
    top: 50%;
    left: 50%;

    box-sizing: border-box;
    min-width: 500px;
    transform: translate(-50%,-50%);

    padding: 50px 35px;
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
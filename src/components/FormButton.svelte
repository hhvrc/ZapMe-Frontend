<script lang="ts">
  export let disabled = false;
  export let content = '';
</script>

<button type="submit" class="usn default-btn-text submit-btn" disabled='{disabled}'>{content}</button>

<style>
  button {
    width: 100%;
    border-radius: 5px;

    outline: none;
    border: none;
  }
  .submit-btn {
    padding: 15px 0;
  }
</style>
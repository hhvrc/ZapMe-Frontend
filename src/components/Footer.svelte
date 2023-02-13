<script lang="ts">
  const year = new Date().getFullYear();
</script>

<svelte:head>
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Montserrat:300,400,600,700&amp;lang=en" />
</svelte:head>

<footer>
  <div class="l">
    Made with <span style="color: #e25555;">&#9829;</span> by HentaiHeaven#0001
  </div>
  <div class="c">
    Copyright @{year} | All Rights Reserved
  </div>
  <div class="r">
      <a class="usn" href="/privacy-policy">
        Privacy Policy
      </a>
      <a class="usn" href="/tos">
        Terms of Service
      </a>
  </div>
</footer>

<style>
  footer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  a {
    color: inherit;
    text-decoration: none;

    font-family: 'Montserrat', sans-serif;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    
    font-weight: 400;
    font-size: 18px;
  }

  .l {
    padding: 24px;
  }
  .c {
    padding: 24px;
    text-align: center;
  }
  .r {
    padding: 24px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 32px;
  }
</style>
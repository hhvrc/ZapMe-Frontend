<script lang="ts">
</script>

<svelte:head>
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Montserrat:300,400,600,700&amp;lang=en" />
</svelte:head>

<footer>
  <div class="l">
    Made with <span style="color: #e25555;">&#9829;</span> by HentaiHeavenVR
  </div>
  <div class="c">
    @2023 ZapMe | All Rights Reserved
  </div>
  <div class="r">
      <a href="/privacy">
        Privacy Policy
      </a>
      <a href="/tos">
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

    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    
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
  }
</style>
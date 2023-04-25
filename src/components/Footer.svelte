<script lang="ts">
  import '@fontsource/montserrat';

  const year = new Date().getFullYear();
</script>

<footer>
  <div>
    Made with <span style="color: #e25555;">&#9829;</span> by HentaiHeaven#0001
  </div>
  <div>Copyright ©{year} | All Rights Reserved</div>
  <div class="r">
    <a class="usn" href="/privacy"> Privacy Policy </a>
    <a class="usn" href="/tos"> Terms of Service </a>
  </div>
</footer>

<style>
  footer {
    min-height: 0;

    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: stretch;
    align-content: stretch;
    justify-content: space-between;

    gap: 16px;
    padding: 16px;
    font-size: 0.8rem;
  }
  div {
    text-align: center;
  }
  a {
    color: inherit;
    text-decoration: none;
  }

  .r {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
  }
  @media (max-width: 700px) {
    footer {
      flex-direction: column;
      flex-wrap: nowrap;
    }
    .r {
      justify-content: center;
    }
  }
</style>

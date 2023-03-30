<div>
  <div class="loading-widget">
    <div class="loading-widget__spinner">
      <div class="loading-widget__spinner__dot"></div>
      <div class="loading-widget__spinner__dot"></div>
      <div class="loading-widget__spinner__dot"></div>
      <div class="loading-widget__spinner__dot"></div>
    </div>
    <div class="loading-widget__text">Loading...</div>
  </div>
</div>

<style>
  .loading-widget {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .loading-widget__spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #f5f5f5;
  }
  .loading-widget__spinner__dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #000;
    margin: 0 5px;
    animation: loading-widget__spinner__dot 1s ease-in-out infinite;
  }
  .loading-widget__spinner__dot:nth-child(2) {
    animation-delay: 0.1s;
  }
  .loading-widget__spinner__dot:nth-child(3) {
    animation-delay: 0.2s;
  }
  .loading-widget__spinner__dot:nth-child(4) {
    animation-delay: 0.3s;
  }
  .loading-widget__text {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 500;
  }
  @keyframes loading-widget__spinner__dot {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
</style>
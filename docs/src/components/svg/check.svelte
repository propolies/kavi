<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><polyline class="animatePath" points="20 6 9 17 4 12"/></svg>

<style>
  .animatePath {
    stroke-dasharray: 100;
    stroke-dashoffset: -100%;
    animation: drawPath 0.3s ease-out forwards;
  }

  @keyframes drawPath {
    0% {
      stroke-dashoffset: -100%;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
</style>
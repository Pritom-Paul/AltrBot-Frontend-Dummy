<script>
  
    let scrollHeight = 0;
    let windowHeight = 0;
    
    const gotoBottom = () => {
      if (typeof window !== 'undefined' && window.document) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    };
  
    $: showGotoBottom = typeof window !== 'undefined'
      ? scrollHeight + windowHeight < document.body.scrollHeight
      : false;
  
  </script>
  
  {#if showGotoBottom}
    <button on:click={gotoBottom} class="goto__bottom" title="Go to bottom">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <g fill="none" stroke="currentColor" stroke-width="1.5">
          <path
            fill="white"
            d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m9 10.5l3 3l3-3"
          />
        </g>
      </svg>
    </button>
  {/if}
  
  <svelte:window bind:scrollY={scrollHeight} bind:innerHeight={windowHeight} />
  
  <style>
    .goto__bottom {
      position: fixed;
      right: 0.2rem;
      bottom: 1.5rem;
      cursor: pointer;
      color: #040220;
      border-radius: 0.15rem;
      transition-duration: 300ms;
      z-index: 999;
      background: none;
      border: none;
      padding: 0;
    }
    .goto__bottom:hover {
      transform: translateY(8px);
    }
  </style>
  
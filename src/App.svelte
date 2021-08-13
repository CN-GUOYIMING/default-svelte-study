<script lang="ts">
  import Router from 'svelte-spa-router'
  import { routes } from './router'
</script>

<Router {routes} />

<style global lang="postcss">
  @tailwind base;
  @tailwind components;

  .my-bg {
    background: black;
    /* @apply bg-black; */
  }

  @tailwind utilities;
</style>

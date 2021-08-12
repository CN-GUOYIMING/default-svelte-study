<script lang="ts">
  import Router from 'svelte-spa-router'
  import { routes } from './router'
</script>

<Router {routes} /> 

<style global lang="postcss">
  @tailwind base;
  @tailwind components;

  @layer components {
    .btn {
      @apply px-4 py-2 bg-blue-600 text-white rounded;
    }
  }

  @tailwind utilities;
</style>

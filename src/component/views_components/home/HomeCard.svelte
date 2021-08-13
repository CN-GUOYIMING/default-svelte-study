<script lang="ts">
  export let title: string = ''
  export let containerStyle: string = ''
  export let contentStyle: string = ''
</script>

<section id="container" style={containerStyle} class="shadow-lg">
  <div
    id="title"
    class="rounded-t px-3 py-2 bg-pink-300 font-sans font-semibold text-white"
  >
    {title}
  </div>

  <article style={contentStyle} class="p-3 bg-pink-200">
    <slot />
  </article>
</section>

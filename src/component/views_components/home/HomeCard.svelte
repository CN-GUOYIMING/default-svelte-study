<script lang="ts">
  // States
  export let title: string = ''

  // Styles
  export let containerClass: string = ''
  export let containerStyle: string = ''
  export let contentClass: string = ''
  export let contentStyle: string = ''
</script>

<section
  id="container"
  class={`${containerClass} shadow-lg`}
  style={containerStyle}
>
  <div
    id="title"
    class="rounded-t px-3 py-2 bg-pink-300 font-sans font-semibold text-white"
  >
    {title}
  </div>

  <article class={`${contentClass} p-3 bg-pink-200`} style={contentStyle}>
    <slot />
  </article>
</section>

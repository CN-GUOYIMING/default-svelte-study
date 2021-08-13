<script lang="ts">
  // State
  export let value: string = ''
  export let placeholder: string = ''

  // Style
  export let containerClass: string = ''
  export let containerStyle: string = ''
  export let inputClass: string = ''
  export let inputStyle: string = ''
</script>

<div class={`${containerClass} inline-block w-44 pt-0`} style={containerStyle}>
  <input
    type="text"
    bind:value
    {placeholder}
    class={`${inputClass} px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full`}
    style={inputStyle}
  />
</div>

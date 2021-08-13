<script lang="ts">
  import { DEFAULT_PAGE } from '../../../store'

  export let pageNumbers: number
  export let currentPage: number = $DEFAULT_PAGE
  export let style: string = ''

  const handlePrevious = () =>
    (currentPage = currentPage - 1 > 0 ? currentPage - 1 : $DEFAULT_PAGE)

  const handleNext = () =>
    (currentPage =
      currentPage + 1 < pageNumbers ? currentPage + 1 : pageNumbers)
</script>

<article class="main-container text-center" {style}>
  <button type="button" on:click={handlePrevious} class="inline-block"
    >{'<'}
  </button>
  <span class="current-page">{currentPage}</span>
  <button type="button" on:click={handleNext} class="inline-block"
    >{'>'}
  </button>
</article>

<style>
  .main-container {
    align-self: center;
    display: flex;
  }
  .current-page {
    border-bottom: 1px solid orangered;
    cursor: pointer;
    margin: 0 30px;
  }
  button {
    align-items: center;
    background-color: #f76cad66;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    width: 40px;
  }
</style>

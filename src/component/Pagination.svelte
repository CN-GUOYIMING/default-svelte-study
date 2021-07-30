<script>
  const DEFAULT_PAGE = 1; // デフォルトに表示されるページ番号

  export let pageNumbers;
  export let currentPage = DEFAULT_PAGE;
  export let style;
</script>

<article class="main-container" {style}>
  <button 
    type="button" 
    on:click={
      () => currentPage = currentPage - 1 > 0 
        ? currentPage - 1 
        : DEFAULT_PAGE
    }
  >
    {'<'}
  </button>
  
  <span class="current-page">{currentPage}</span>
  
  <button 
    type="button"
    on:click={
      () => currentPage = currentPage + 1 < pageNumbers 
        ? currentPage + 1 
        : pageNumbers
    }
  >
    {'>'}
  </button>
</article>

<style>
  .main-container {
    align-self: center;
    display: flex;
    margin-top: 20px;
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
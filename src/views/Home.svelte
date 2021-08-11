<script>
  // Dependencies
  import { onMount } from 'svelte';
  import { 
    DEFAULT_PAGE, 
    ONE_PAGE_LINES,
    dataList, 
    isClearTerms
  } from '../store';
  // Components
  import Filter from '../component/Filter.svelte';
  import Graph from '../component/Graph.svelte';
  import ShowList from '../component/ShowList.svelte';
  import Pagination from '../component/Pagination.svelte';
  import Button from '../component/Button.svelte';

  let currentPage = $DEFAULT_PAGE;
  let pageSlices = [];

  onMount(async () => {
    // NOTE: 初期データを取得する API はここでコール。
    const response = await fetch('/data.json');
    const data = await response.json()
    
    dataList.set(data);
  });

  /** Functions*/
  const handleFilter = (event) => {
    const { filteredData } = event.detail;
    pageSlices = slicePage(filteredData);
  }

  const slicePage = (data) => {
    let slices = [];

    // 総データの件数をページ毎の表示件数で割ってページ数を取得
    const pageNumbers = data.length 
      ? Math.ceil(data.length / $ONE_PAGE_LINES)
      : $DEFAULT_PAGE
    
    // ページ数を回数にループを行い、ページ毎の表示データを切り分ける
    for ( let times = 1; times <= pageNumbers; times++ ) {
      const startIndex = (times - 1) * $ONE_PAGE_LINES;
      const endIndex = startIndex + $ONE_PAGE_LINES;

      slices = [...slices, data.slice(startIndex, endIndex)];
    }

    return slices;
  }

  const clearTerms = () => {
    isClearTerms.set(true);
  };

  const updateData = async () => {
    // NOTE: 更新 API はここでコール。
    console.log($dataList);
  };
</script>

<div id="wrapper">
  <nav
    class="navbar-default navbar-static-side"
    role="navigation"
  ></nav>

  <div 
    id="page-wrapper" 
    class="gray-bg dashbard-1" 
    style="min-height: 760px;"
  >
    <div class="contents-container">
      <!-- フィルター -->
      <Filter on:filter={handleFilter} />
      <!-- グラフ -->
      <Graph {pageSlices} />
      <!-- 表示リスト -->
      <ShowList bind:pageSlices {currentPage} />

      <!-- ページ切り替え -->
      <Pagination 
        pageNumbers={pageSlices.length} 
        bind:currentPage
        style={"margin-top: 30px;"}
      />

      <!-- ボタン -->
      <div class="button_container">
        <Button title="クリア" on:click={clearTerms} />
        <Button title="保存" on:click={updateData} />
      </div>
    </div>
  </div>
</div>

<style>
  .contents-container {
    display: flex;
    flex-direction: column;
  }
  .button_container {
    align-self: center;
    display: flex;
    justify-content: space-around;
    width: 45%;
  }
</style>

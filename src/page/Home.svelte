<script>
  // Dependencies
  import { onMount } from 'svelte';
  import { dataList } from '../store';
  // Components
  import Filter from '../component/Filter.svelte';
  import Pagination from '../component/Pagination.svelte';

  // Const
  const DEFAULT_PAGE = 1; // デフォルトに表示されるページ番号
  const ONE_PAGE_LINES = 4; // 一ページに表示される件数

  let currentPage = DEFAULT_PAGE;
  $: pageSlices = filterData($dataList, { codeRange, targetFlag });
  let codeRange = { begin: '', end: ''}
  let targetFlag = '';

  onMount(async () => {
    // NOTE: 初期データを取得する API はここでコール。
    const response = await fetch('/data.json');
    const data = await response.json()
    
    dataList.update(self => {
      return data;
    })
  });

  /** Functions*/
  /**
   * データを濾過する。
   * @param orignalData
   * @param filterTerms
   * 
   * @returns {Array}
   */
  const filterData = (orignalData, { codeRange, targetFlag }) => {
    let slices = [];
    let temporary = orignalData;

    temporary = filterDataByCode(temporary, codeRange);
    temporary = filterDataByFlag(temporary, targetFlag);
    slices = slicePage(temporary);
    
    return slices;
  };

  const filterDataByCode = (
    data, codeRange = { begin: '', end: '' }
  ) => {
    if (!codeRange.begin || !codeRange.end) return data;

    // NOTE: コードに応じて比較方法が変わることがある。
    return data.filter(
      item => {
        const begin = codeRange.begin?.toUpperCase();
        const end = codeRange.end?.toUpperCase();

        if (
          begin.length !== item.code.length || 
          end.length !== item.code.length
        ) return;

        return begin <= item.code && item.code <=end
      }
    )
  };

  const filterDataByFlag = (data, flag) => {
    if (!flag) return data;
    return data.filter(item => item.flag.includes(flag));
  };

  const slicePage = (data) => {
    let slices = [];

    // 総データの件数をページ毎の表示件数で割ってページ数を取得
    const pageNumbers = data.length 
      ? Math.ceil(data.length / ONE_PAGE_LINES)
      : DEFAULT_PAGE
    
    // ページ数を回数にループを行い、ページ毎の表示データを切り分ける
    for ( let times = 1; times <= pageNumbers; times++ ) {
      const startIndex = (times - 1) * ONE_PAGE_LINES;
      const endIndex = startIndex + ONE_PAGE_LINES;

      slices = [...slices, data.slice(startIndex, endIndex)];
    }

    return slices;
  }

  const clearTerms = () => {
    codeRange = {};
    targetFlag = '';
  };

  const updateData = async () => {
    // NOTE: 更新 API はここでコール。
    console.log(dataList);
  };
</script>

<main>
  <!-- フィルター -->
  <Filter bind:codeRange bind:targetFlag />

  <!-- 表示リスト -->
  <section class="content-box" style="margin-top: 30px;">
    <div class="label-title">表示リスト</div>

    <article class="table_container">
      <div class="table_header_container">
        <div class="ceil_header">大分類コード</div>
        <div class="ceil_header">大分類名</div>
        <div class="ceil_header ceil_end">〇〇フラグ</div>
      </div>

      <div class="table_items_container">
        {#each pageSlices[currentPage - 1] as item, index(item.code)}
          <div class="table_item_container">
            <div class="ceil_item">{item.code}</div>
            <div class="ceil_item">{item.name}</div>
            
            <div class="ceil_item ceil_end">
              <input type="text" bind:value={item.flag}>
            </div>
          </div>
        {/each}
      </div>
    </article>
  </section>

  <!-- ページ切り替え -->
  <Pagination 
    pageNumbers={pageSlices.length} 
    bind:currentPage
    style={"margin-top: 30px;"}
  />

  <!-- ボタン -->
  <div class="button_container">
    <button type="button" on:click={() => clearTerms()}>クリア</button>
    <button type="button" on:click={updateData}>保存</button>
  </div>
</main>

<style>
  .content-box {
    border-radius: 2px;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.7);
  }

  .label-title {
    background-color: #f76cadcc;
    color: #fff;
    font-weight: 400;
    padding: 5px 20px;
  }

  main {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    margin: 70px auto;
    width: 600px;
  }

  input {
    width: 70px;
  }

  .table_container {
    background-color: #f76cad33;
    padding: 10px;
  }
  .table_header_container {
    display: flex;
  }
  .table_item_container {
    display: flex;
  }
  .ceil_header {
    border: 1px solid black;
    border-right: 0;
    display: flex;
    flex: 1;
    padding: 3px 10px;
  }
  .ceil_item {
    border: 1px solid black;
    border-right: 0;
    border-top: 0;
    display: flex;
    flex: 1;
    padding: 3px 10px;
  }
  .ceil_end {
    border-color: black;
    border-right: 1px;
    border-style: solid;
  }
  .button_container {
    align-self: center;
    display: flex;
    justify-content: space-around;
    width: 45%;
  }
  button {
    align-self: center;
    background-color: #f76cad66;
    border: 0;
    border-radius: 5px;
    color: #000;
    cursor: pointer;
    display: flex;
    font-family: 600px;
    justify-content: center;
    margin-top: 30px;
    padding: 6px 20px;
    width: 100px;
  }
</style>

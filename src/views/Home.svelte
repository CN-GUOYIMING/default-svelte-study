<script lang="ts">
  // Dependencies
  import { onMount } from 'svelte'
  // Stores
  import {
    DEFAULT_PAGE,
    ONE_PAGE_LINES,
    dataList,
    isClearTerms,
  } from '../store'
  // Components
  import Filter from '../component/views_components/home/Filter.svelte'
  import Chart from '../component/common/Chart/Chart.svelte'
  import ShowList from '../component/views_components/home/ShowList.svelte'
  import Pagination from '../component/views_components/home/Pagination.svelte'
  import Button from '../component/common/Button.svelte'

  let currentPage = $DEFAULT_PAGE
  let pageSlices = []

  onMount(async () => {
    // NOTE: 初期データを取得する API はここでコール。
    const response = await fetch('/data.json')
    const data = await response.json()

    dataList.set(data)
  })

  /** Functions*/
  const handleFilter = (event) => {
    const { filteredData } = event.detail
    pageSlices = slicePage(filteredData)
  }

  const slicePage = (data) => {
    let slices = []

    // 総データの件数をページ毎の表示件数で割ってページ数を取得
    const pageNumbers = data.length
      ? Math.ceil(data.length / $ONE_PAGE_LINES)
      : $DEFAULT_PAGE

    // ページ数を回数にループを行い、ページ毎の表示データを切り分ける
    for (let times = 1; times <= pageNumbers; times++) {
      const startIndex = (times - 1) * $ONE_PAGE_LINES
      const endIndex = startIndex + $ONE_PAGE_LINES

      slices = [...slices, data.slice(startIndex, endIndex)]
    }

    return slices
  }

  const clearTerms = () => {
    isClearTerms.set(true)
  }

  const updateData = async () => {
    // NOTE: 更新 API はここでコール。
    console.log($dataList)
  }
</script>

<main id="main-container" class="flex flex-col p-5 h-full bg-gray-200">
  <!-- フィルター -->
  <Filter on:filter={handleFilter} />

  <!-- グラフ -->
  <div class="mt-7">
    <Chart />
  </div>

  <!-- 表示リスト -->
  <ShowList bind:pageSlices {currentPage} />

  <!-- ページ切り替え -->
  <Pagination
    pageNumbers={pageSlices.length}
    bind:currentPage
    style="margin: 30px 0 0;"
  />

  <!-- ボタン -->
  <div class="self-center flex justify-around w-2/4 ">
    <Button title="クリア" on:click={clearTerms} />
    <Button title="保存" on:click={updateData} />
  </div>
</main>

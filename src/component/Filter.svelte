<script>
  import { createEventDispatcher } from 'svelte';
  import { dataList, isClearTerms } from '../store';
  import Card from './Card.svelte';

  let codeRange = [];
  let targetFlag = '';
  const dispatch = createEventDispatcher();
  $: filterData($dataList, { codeRange, targetFlag });
  
  $: if ($isClearTerms) {
    codeRange = [];
    targetFlag = '';
  }

  /** Functions*/
  /**
   * データを濾過する。
   * @param orignalData
   * @param filterTerms
   * 
   * @returns {Array}
   */
   const filterData = (orignalData, { codeRange, targetFlag }) => {
    isClearTerms.set(false);
    
    let temporary = [...orignalData];

    temporary = filterDataByCode(temporary, codeRange);
    temporary = filterDataByFlag(temporary, targetFlag);

    dispatch('filter', { filteredData: temporary })
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
</script>

<Card title='検索条件'>
  <div class="item-container">
    <div class="label">大分類コード</div>
    
    <div class="contents-container">
      <input type="text" bind:value={codeRange.begin}>
      <span class="wave">~</span>
      <input type="text" bind:value={codeRange.end}>
    </div>   
  </div>

  <div class="item-container" style="margin-top: 10px;">
    <div class="label">〇〇フラグ</div>
    
    <div class="contents-container">
      <input type="text" bind:value={targetFlag}>
    </div>
  </div>
</Card>

<style>
  .item-container { display: flex; }
  .label { flex: 2 }
  .contents-container { flex: 3 }
  .wave { margin: 0 20px; }
  input { width: 70px; }
</style>
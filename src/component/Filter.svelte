<script>
  import Card from './Card.svelte';

  export let codeRange;
  export let targetFlag;
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
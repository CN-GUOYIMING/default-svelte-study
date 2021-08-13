<script lang="ts">
  import Card from './HomeCard.svelte'
  import type { Food } from '../../../../types/views_types/home'

  export let pageSlices: Array<Array<Food>>
  export let currentPage: number
</script>

<Card title="表示リスト" containerStyle="margin-top: 30px;">
  <div class="table table-striped">
    <thead class="temporary">
      <tr style="display: flex;">
        <th style="flex: 1;">大分類コード</th>
        <th style="flex: 1;">大分類名</th>
        <th style="flex: 1;">〇〇フラグ</th>
      </tr>
    </thead>

    <tbody class="temporary">
      {#if pageSlices.length > 0}
        {#each pageSlices[currentPage - 1] as item (item.code)}
          <tr style="display: flex;">
            <td style="flex: 1;">{item.code}</td>
            <td style="flex: 1;">{item.name}</td>

            <td style="flex: 1;">
              <input type="text" bind:value={item.flag} />
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </div>
</Card>

<style>
  input {
    width: 70px;
  }

  .temporary {
    display: flex;
    flex-direction: column;
  }
</style>

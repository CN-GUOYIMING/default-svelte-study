<script lang="ts">
  import type { Food } from '../../../types/views_types/home'
  import Card from './HomeCard.svelte'
  import Input from '../../common/Input/Input.svelte'

  // Props
  export let pageSlices: Food[][]
  export let currentPage: number

  // Styles
  const ceil = 'px-5 py-1 border border-l-0 border-t-0 border-gray-500'
</script>

<Card title="表示リスト" contentClass="flex">
  <table class=" flex-1 border-l border-t border-gray-500">
    <thead>
      <tr class="h-14">
        <th class={ceil}>大分類コード</th>
        <th class={ceil}>大分類名</th>
        <th class={ceil}>〇〇フラグ</th>
      </tr>
    </thead>

    <tbody>
      {#if pageSlices.length > 0}
        {#each pageSlices[currentPage - 1] as item, index (item.code)}
          <tr class="h-14">
            <td class={`${ceil} text-center`}>{item.code}</td>
            <td class={`${ceil} text-center`}>{item.name}</td>

            <td class={`${ceil}`}>
              <Input bind:value={item.flag} containerClass="w-full" />
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</Card>

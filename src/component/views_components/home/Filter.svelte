<script lang="ts">
  // Dependencies
  import { createEventDispatcher } from 'svelte'
  // Types
  import type {
    Food,
    IdRange,
    FilterOptions,
  } from '../../../../types/views_types/home'
  // Store
  import { dataList, isClearTerms } from '../../../store'
  // Components
  import Card from '../home/HomeCard.svelte'
  import Input from '../../common/Input/Input.svelte'

  const dispatch: (type: string, detail: any) => void = createEventDispatcher()

  // interface IdRange {
  //   begin?: string
  //   end?: string
  // }

  let codeRange: IdRange = {}
  let targetFlag: string = ''

  $: filterData($dataList, <FilterOptions>{ codeRange, targetFlag })

  $: if ($isClearTerms) {
    codeRange = {}
    targetFlag = ''
  }

  /** Functions*/
  /**
   * データを濾過する。
   * @param orignalData
   * @param filterTerms
   */
  const filterData = (
    orignalData: Food[],
    { formalCodeRange, formalTargetFlag }: FilterOptions
  ) => {
    isClearTerms.set(false)

    let temporary: Food[] = [...orignalData]

    temporary = filterDataByCode(temporary, formalCodeRange)
    temporary = filterDataByFlag(temporary, formalTargetFlag)

    dispatch('filter', { filteredData: temporary })
  }

  const filterDataByCode = (data: Food[], { begin, end }: IdRange = {}) => {
    if (!begin && !end) return data

    // NOTE: コードに応じて比較方法が変わることがある。
    return data.filter((item: Food) => {
      const upperBegin = begin?.toUpperCase()
      const upperEnd = end?.toUpperCase()

      if (
        upperBegin.length !== item.code.length ||
        upperEnd.length !== item.code.length
      )
        return

      return upperBegin <= item.code && item.code <= upperEnd
    })
  }

  const filterDataByFlag = (data: Food[], flag: string) => {
    if (!flag) return data
    return data.filter((item: Food) => item.flag.includes(flag))
  }
</script>

<Card title="検索条件">
  <div id="code-line" class="flex items-baseline">
    <div class="flex-1 text-center text-lg">大分類コード</div>

    <div style="flex: 2;">
      <Input
        bind:value={codeRange.begin}
        placeholder="始め"
        containerClass="inline-block pt-0"
        inputClass="my-bg"
      />

      <span class="ml-2">~</span>

      <Input
        bind:value={codeRange.end}
        placeholder="終わり"
        containerClass="inline-block ml-2 pt-0"
      />
    </div>
  </div>

  <div id="flag-line" class="flex items-baseline mt-3">
    <span class="flex-1 text-center text-lg">〇〇フラグ</span>

    <div class="mt-3" style="flex: 2;">
      <Input bind:value={targetFlag} placeholder="フラグを入力してください" />
    </div>
  </div>
</Card>

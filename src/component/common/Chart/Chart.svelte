<script lang="ts">
  // Dependencies
  import { afterUpdate, onMount } from 'svelte'
  import Chart from 'chart.js'
  // Stores
  import { dataList } from '../../../store'

  interface Count {
    normal: number
    frozen: number
  }

  let count: Count = { normal: 0, frozen: 0 }

  // init chart
  afterUpdate(async () => {
    $dataList.forEach((item) => {
      item.flag === '常温' && count.normal++
      item.flag === '冷凍' && count.frozen++
    })

    let config = {
      type: 'pie',
      data: {
        labels: ['常温', '冷凍'],
        datasets: [
          {
            data: [count.normal, count.frozen],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
            hoverOffset: 4,
          },
        ],
        options: {
          maintainAspectRatio: false,
        },
      },
    }

    let canvasRenderingContext = document.getElementById('chart')
    let chart = new Chart(canvasRenderingContext, config)

    return () => (chart = undefined)
  })
</script>

<div
  class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
>
  <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
    <div class="flex flex-wrap items-center">
      <div class="relative w-full max-w-full flex-grow flex-1">
        <h6 class="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
          保存方式
        </h6>
        <h2 class="text-blueGray-700 text-xl font-semibold">割合</h2>
      </div>
    </div>
  </div>
  <div class="p-4 flex-auto">
    <div class="relative" style="height: 50%; width: 100%;">
      <canvas id="chart" />
    </div>
  </div>
</div>

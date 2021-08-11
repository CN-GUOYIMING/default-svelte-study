<script>
  import { Chart } from 'chart.js';
  import { onDestroy, onMount } from 'svelte';
  import Card from './Card.svelte';

  // export let pageSlices;

  let chartCanvas;

  onMount(() => {
    let graph = new Chart(
      chartCanvas,
      {
        type: 'bar',
        data: {
          labels: ['a', 'b', 'c'],
          data: [1, 2, 3]
        },
      }
    );

    return () => (graph = null);
  });
</script>

<Card title="グラフ" containerStyle="margin: 30px 0 0;">
  <canvas id='graph' bind:this={chartCanvas} width="300"/>
</Card>
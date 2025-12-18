<template>
    <div ref="plotElement"></div>
   </template>
   
<script setup>
   //import Plotly from 'plotly.js-dist-min'
   import { ref, onMounted, watch } from 'vue'
   import { defineClientComponent } from 'vitepress'
   
   const props = defineProps({
     data: Array,
     layout: Object
   })

// const Plotly = defineClientComponent(() => {
//    return import('plotly.js-dist-min')
// })

   const plotElement = ref(null)
   
   const renderChart = () => {
            Plotly.newPlot(plotElement.value, props.data, props.layout);
        }
   
   onMounted(async () => {
        const Plotly = await import("plotly.js-dist-min");
        
        renderChart();
   })
   
   watch(() => props.data, renderChart)
   watch(() => props.layout, renderChart)
</script>

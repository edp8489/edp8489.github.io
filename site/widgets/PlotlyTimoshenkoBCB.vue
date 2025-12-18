<template>
    <div id="plotly-chart">
        <PlotlyChart :data="chartData.figure1.data" :layout="chartData.figure1.layout" />
        <PlotlyChart :data="chartData.figure2.data" :layout="chartData.figure2.layout" />
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import PlotlyChart from '../.vitepress/theme/components/PlotlyChart.vue'
    import jsonData from './bcb_chart_data.json'
    
    const chartData = ref(jsonData)

    //const customWidth = 800
    //const customHeight = 800
    
    onMounted(() => {
        //chartData.value = chartDataJson
        //console.log(Object.keys(jsonData.figure1.layout))
    })
</script>

<template>
	<div class="map-container" ref="chartdiv"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { getSummary } from '@/plugins/api-client';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';

const chartdiv = ref(null);
const am5Root = ref(null);
const countries = ref([]);

const { success, data } = await getSummary();

if (success) {
	countries.value = data.countries;
}

onMounted(() => {

	// Instantiating the map chart.
	// Please refer to the following link for further insight into the basics of creating
	// such a chart: https://www.amcharts.com/docs/v5/charts/map-chart/

	const mapColor = '#e5e5e5';
	const mapColorHover = '#476582';

	let root = am5.Root.new(chartdiv.value);

	let chart = root.container.children.push(
		am5map.MapChart.new(root, { projection: am5map.geoMercator() })
	);

	// Add countries data to the properties of geographic data
	am5geodata_worldLow.features.forEach((geographic) => {
		const country = countries.value.find((country) => country.code === geographic.id);
		if (country) {
			geographic.properties.data = country;
		}
	});

	let polygonSeries = chart.series.push(
		am5map.MapPolygonSeries.new(root, {
			geoJSON: am5geodata_worldLow,
			fill: am5.color(mapColor),
		})
	);

	polygonSeries.mapPolygons.template.states.create('hover', {
		fill: am5.color(mapColorHover),
	});

	const bold = 'font-weight:600;';
	const statsStyle = 'display:block;font-size:0.9375rem;';
	const tooltipHTML = `
		<div style="color:#ffffff">
			<span style="${bold}">{name}</span>
			<span style="${statsStyle}">
				Confirmed: <span style="${bold}">{data.statistics.confirmed}</span>
			</span>
			<span style="${statsStyle}">
				Deaths: <span style="${bold}">{data.statistics.deaths}</span>
			</span>
			<span style="${statsStyle}">
				Recovered: <span style="${bold}">{data.statistics.recovered}</span>
			</span>
		</div>
	`;

	polygonSeries.mapPolygons.template.setAll({
		tooltipHTML,
		interactive: true,
	});

	am5Root.value = root;
});

onBeforeUnmount(() => {
	if (am5Root.value) {
		am5Root.value.dispose();
	}
});
</script>

<style scoped>
.map-container {
	width: 100%;
	height: 100%;
}
</style>

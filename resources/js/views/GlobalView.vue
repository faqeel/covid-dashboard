<template>
	<main>
		<section>
			<Suspense>
				<template #default>
					<GlobalStatistics />
				</template>
				<template #fallback>
					<GlobalStatisticsSuspense />
				</template>
			</Suspense>
		</section>
		<section class="map-section">
			<Suspense>
				<template #default>
					<MapChart />
				</template>
				<template #fallback>
					<ThreeDotsLoading />
				</template>
			</Suspense>
		</section>
	</main>
</template>

<script setup>
import GlobalStatistics from '../components/GlobalStatistics.vue';
import GlobalStatisticsSuspense from '../components/suspenses/GlobalStatisticsSuspense.vue';
import MapChart from '../components/MapChart.vue';
import ThreeDotsLoading from '../components/suspenses/ThreeDotsLoading.vue';
</script>

<style scoped>
main {
	display: flex;
	flex-direction: column;
	flex: 1;
	height: 100%;
}

section {
	border-bottom: 1px solid var(--vt-c-divider-light);
}

.map-section {
	flex: 1;
	padding: 0;
	display: flex;
	align-items: center;
}
</style>

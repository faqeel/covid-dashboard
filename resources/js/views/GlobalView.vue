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
		<section></section>
	</main>
</template>

<script setup>
import GlobalStatistics from '../components/GlobalStatistics.vue';
import GlobalStatisticsSuspense from '../components/suspenses/GlobalStatisticsSuspense.vue';
</script>

<style scoped>
main {
	display: flex;
	flex-direction: column;
	flex: 1;
}

section {
	border-bottom: 1px solid var(--vt-c-divider-light);
}
</style>

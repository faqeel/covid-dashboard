<template>
	<main>
		<section>
			<Suspense>
				<template #default>
					<CountriesTable />
				</template>
				<template #fallback>
					<CountriesTableSuspenses />
				</template>
			</Suspense>
		</section>
	</main>
</template>

<script setup>
import CountriesTable from '@/components/CountriesTable.vue'
import CountriesTableSuspenses from '@/components/suspenses/CountriesTableSuspenses.vue'
</script>

<style scoped>
main {
	display: flex;
	flex-direction: column;
	flex: 1;
	height: 100%;
}

section {
	max-width: 960px;
	margin: 0 auto;
	padding: 0;
	color: var(--vt-c-text-2);
	flex: 1;
	width: 100%;
}
</style>

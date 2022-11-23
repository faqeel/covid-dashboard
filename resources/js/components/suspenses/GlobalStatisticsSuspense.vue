<template>
	<div class="global-statistics">
		<StatisticItemSuspense title="Confirmed cases" />
		<StatisticItemSuspense title="Deaths" />
		<StatisticItemSuspense title="Recovered" />
	</div>
</template>

<script setup>
import StatisticItemSuspense from './StatisticItemSuspense.vue';
</script>

<style scoped>
.global-statistics {
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	text-align: center;
	justify-content: space-between;
	align-items: center;
	padding: 1.25rem 1rem;
	max-width: 960px;
	margin: 0 auto;
	color: var(--vt-c-text-2);
}

@media (min-width: 480px) {
	.global-statistics {
		flex-direction: row;
		text-align: left;
		padding: 2.75rem 2rem;
	}
}
</style>

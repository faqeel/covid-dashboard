<template>
	<div class="statistic-item">
		<h2>{{ valueRender ? valueRender(value) : value }}</h2>
		<p>{{ title }}</p>
	</div>
</template>

<script setup>
defineProps({
	value: String,
	title: String,
	valueRender: Function
});
</script>

<style scoped>
.statistic-item {
	margin: 1rem 0;
}

@media (min-width: 480px) {
	.statistic-item {
		margin: 0;
	}
}

h2 {
	font-size: 1.25rem;
	font-weight: 600;
	letter-spacing: -0.4px;
	color: var(--vt-c-text-1);
}

p {
	font-size: 0.9375rem;
	font-weight: 400;
}
</style>

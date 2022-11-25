<template>
	<div class="statistic-item">
		<div class="skeleton skeleton-text"></div>
		<p>{{ title }}</p>
	</div>
</template>

<script setup>
defineProps({
	title: String,
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

p {
	font-size: 0.9375rem;
	font-weight: 400;
}

.skeleton-text {
	display: block;
	height: 0.75rem;
	background: #eee;
	background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
	border-radius: 5px;
	background-size: 200% 100%;
	position: relative;
	overflow: hidden;
}

.skeleton-text>* {
	visibility: hidden;
}

.skeleton {
	animation: 1.5s shine linear infinite;
}

@keyframes shine {
	to {
		background-position-x: -200%;
	}
}
</style>

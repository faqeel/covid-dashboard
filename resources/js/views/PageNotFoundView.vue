<template>
	<main>
		<div class="page-not-found-container">
			<h1>Page Not Found</h1>
			<p>
				You found a dead link:
				<span class="not-found-path">{{ deadLink }}</span>
			</p>
		</div>
	</main>
</template>

<script setup>
const deadLink = window.location.pathname;
</script>

<style scoped>
main {
	display: flex;
	flex-direction: column;
}

.page-not-found-container {
	line-height: 1.7;
	padding: 2rem 3rem;
	background-color: var(--vt-c-bg-soft);
	margin: 2rem;
	border-radius: 8px;
}

h1 {
	margin: 0 0 2rem;
	font-size: 2rem;
	line-height: 1.4;
	letter-spacing: -0.02em;
	position: relative;
	font-weight: 600;
	outline: none;
}

@media (min-width: 480px) {
	h1 {
		font-size: 2.375rem;
	}
}

p {
	margin-bottom: 1.2em;
}

.not-found-path {
	font-family: var(--vt-font-family-mono);
	color: var(--vt-c-text-code);
}
</style>

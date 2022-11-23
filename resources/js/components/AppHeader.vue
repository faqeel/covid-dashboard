<template>
	<header>
		<div class="container">
			<RouterLink class="navbar-title" to="/">Covid-19</RouterLink>
			<nav>
				<RouterLink class="link" to="/">Global</RouterLink>
				<RouterLink class="link" to="/countries">Countries</RouterLink>
			</nav>
			<FetchButton />
		</div>
	</header>
</template>

<script setup>
import FetchButton from './FetchButton.vue';
</script>

<style scoped>
header {
	position: fixed;
	top: 0;
	width: 100%;
	border-bottom: 1px solid var(--vt-c-divider-light);
	padding: 0 0.75rem;
	height: var(--vt-nav-height);
	white-space: nowrap;
	z-index: 1;
	-webkit-backdrop-filter: saturate(50%) blur(8px);
	backdrop-filter: saturate(50%) blur(8px);
	background: rgba(255, 255, 255, 0.7);
}

.container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 auto;
	padding: 0;
	position: relative;
	height: 100%;
}

@media (min-width: 480px) {
	.container {
		max-width: 1376px;
		padding: 0 2rem;
	}
}

.navbar-title {
	font-weight: 600;
	transition: opacity 0.25s;
}

.navbar-title:hover {
	opacity: 0.6;
}

nav {
	display: flex;
}

.link {
	padding: 0 0.75rem;
	line-height: calc(var(--vt-nav-height) - 1px);
	font-size: 0.75rem;
	font-weight: 500;
	transition: color 0.25s;
	white-space: nowrap;
	cursor: pointer;
}

.link:hover {
	color: var(--vt-c-brand);
}

.link.router-link-active,
.link.router-link-exact-active {
	border-bottom: 1px solid var(--vt-c-brand);
}
</style>

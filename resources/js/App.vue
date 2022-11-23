<template>
	<div class="content">
		<h1>Hey! 👋🏻</h1>
		<p><code>Vue.js</code> has been set up successfully.</p>
		<p>Let's build something awesome! 🚀</p>
	</div>
</template>

<script setup></script>

<style scoped>
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
}

h1 {
	font-size: 2rem;
	font-weight: 500;
	margin: 2rem 0;
}

p {
	font-size: 1rem;
	margin: 0.25rem 0;
}

code {
	background: var(--vt-c-bg-mute);
	color: var(--vt-c-text-code);
	padding: 0.2em 0.4em;
	margin: 0;
	font-size: 85%;
	border-radius: 6px;
}
</style>

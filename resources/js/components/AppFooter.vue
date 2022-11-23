<template>
	<footer>
		<p>
			Released under the
			<a class="link" href="https://opensource.org/licenses/MIT" target="_blank">MIT License</a>
		</p>
		<p>Copyright © 2022</p>
	</footer>
</template>

<script setup></script>

<style scoped>
footer {
	padding: 1.5rem 0;
	background-color: var(--vt-c-bg-soft);
	transition: border-top 0.5s, background-color 0.5s;
}

p {
	text-align: center;
	line-height: 20px;
	font-size: 0.75rem;
	font-weight: 500;
	color: var(--vt-c-text-2);
	transition: color 0.25s;
}

.link {
	color: var(--vt-c-text-1);
	transition: color 0.25s;
}

.link:hover {
	color: var(--vt-c-text-2);
}
</style>

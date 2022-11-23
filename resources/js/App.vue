<template>
	<AppHeader />
	<div class="content">
		<div class="content-container">
			<RouterView />
		</div>
		<AppFooter />
	</div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<style scoped>
.content {
	display: flex;
	flex-direction: column;
	padding-top: var(--vt-nav-height);
	height: 100vh;
}

.content-container {
	flex: 1;
}
</style>

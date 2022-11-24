<template>
	<div class="three-dots-loading-container">
		<div class="dot-flashing"></div>
	</div>
</template>

<script setup>

</script>

<style scoped>
.three-dots-loading-container {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
}

.dot-flashing {
	position: relative;
	margin: 0.5rem 0.75rem;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	background-color: rgba(60, 60, 60, 0.5);
	color: rgba(60, 60, 60, 0.29);
	animation: dotFlashing 1s infinite linear alternate;
	animation-delay: 0.5s;
}

.dot-flashing::before,
.dot-flashing::after {
	content: '';
	display: inline-block;
	position: absolute;
	top: 0;
}

.dot-flashing::before {
	left: -15px;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	background-color: rgba(60, 60, 60, 0.5);
	color: rgba(60, 60, 60, 0.29);
	animation: dotFlashing 1s infinite alternate;
	animation-delay: 0s;
}

.dot-flashing::after {
	left: 15px;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	background-color: rgba(60, 60, 60, 0.5);
	color: rgba(60, 60, 60, 0.29);
	animation: dotFlashing 1s infinite alternate;
	animation-delay: 1s;
}

@keyframes dotFlashing {
	0% {
		background-color: var(--vt-c-divider);
	}

	50%,
	100% {
		background-color: var(--vt-c-divider-light);
	}
}
</style>

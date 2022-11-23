<template>
	<button v-if="isLoading" class="btn">
		<div class="dot-flashing"></div>
	</button>
	<button v-else @click="onFetch" :disabled="showSuccess || showError" class="btn">
		<span :class="{ success: showSuccess, error: showError }">{{ message }}</span>
	</button>
</template>

<script setup>
import { ref } from 'vue';

const ORIGINAL_MSG = 'Fetch';
const SUCCESS_MSG = 'Queued ✅';
const ERROR_MSG = 'Ops, error! 🏃🏻‍♂️';

const isLoading = ref(false);
const showSuccess = ref(false);
const showError = ref(false);
const message = ref(ORIGINAL_MSG);

async function onFetch() {
	isLoading.value = true;
	try {
		// TODO: Call /fill_data 
		// Simulate HTTP request
		await new Promise((resolve, reject) => {
			setTimeout(() => {
				if (true) {
					updateFetchStatus(showSuccess, SUCCESS_MSG);
					resolve();
				} else {
					reject();
				}
			}, 2000);
		});
	} catch (error) {
		updateFetchStatus(showError, ERROR_MSG);
	} finally {
		isLoading.value = false;
	}
}

function updateFetchStatus(status, msg) {
	status.value = true;
	message.value = msg;
	setTimeout(() => {
		status.value = false;
		message.value = ORIGINAL_MSG;
	}, 5000);
}
</script>

<style scoped>
.btn {
	padding: 0.25rem 0.75rem;
	font-size: 0.75rem;
	font-weight: 500;
	color: var(--vt-c-divider);
	cursor: pointer;
	border: 1px solid var(--vt-c-divider);
	border-radius: 4px;
	background: transparent;
	transition: color 0.5s, border-color 0.5s;
}

.btn:hover {
	color: var(--vt-c-brand);
	border: 1px solid var(--vt-c-brand);
}

.btn:has(.dot-flashing) {
	color: var(--vt-c-divider);
	border: 1px solid var(--vt-c-divider);
}

.btn:has(.success) {
	color: var(--vt-c-brand);
	border: 1px solid var(--vt-c-brand);
}

.btn:has(.error) {
	color: #fd1d7c;
	border: 1px solid #fd1d7c;
}

.dot-flashing {
	position: relative;
	margin: 0.5rem 0.75rem;
	width: 6px;
	height: 6px;
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
	left: -10px;
	width: 6px;
	height: 6px;
	border-radius: 5px;
	background-color: rgba(60, 60, 60, 0.5);
	color: rgba(60, 60, 60, 0.29);
	animation: dotFlashing 1s infinite alternate;
	animation-delay: 0s;
}

.dot-flashing::after {
	left: 10px;
	width: 6px;
	height: 6px;
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

<template>
	<Transition name="modal">
		<div v-if="show" class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					<div class="modal-header">
						<slot name="header"></slot>
						<button class="close" @click="emit('close')"></button>
					</div>
					<div class="modal-body">
						<slot name="body"></slot>
					</div>
					<div class="modal-footer">
						<slot name="footer"></slot>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script setup>
defineProps({ show: Boolean })
const emit = defineEmits(['close']);
</script>

<style scoped>
.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: table;
	transition: opacity 0.3s ease;
}

.modal-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}

.modal-container {
	width: 300px;
	margin: 0 auto;
	padding: 1rem;
	background-color: #fff;
	border-radius: 6px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.modal-body {
	margin: 1rem 0;
}

.modal-footer {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
	opacity: 0;
}

.modal-leave-to {
	opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}

.close {
	position: relative;
	width: 16px;
	height: 16px;
	opacity: 0.3;
	background-color: transparent;
	transition: background-color 0.5s, opacity 0.5s;
}

.close:hover {
	opacity: 1;
	transition-duration: 0.2s;
}

.close:before,
.close:after {
	position: absolute;
	top: 0;
	content: ' ';
	height: 16px;
	width: 2px;
	background-color: #999;
}

.close:before {
	transform: rotate(45deg);
}

.close:after {
	transform: rotate(-45deg);
}
</style>

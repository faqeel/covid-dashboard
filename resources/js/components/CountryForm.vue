<template>
	<div class="country-form-container">
		<!-- Alert -->
		<div v-if="showSuccess || showError" class="alert">
			<p class="alert-text" :class="{ success: showSuccess, error: showError }">{{ msg }}</p>
			<ul v-if="errors && errors.length !== 0">
				<li v-for="error in errors">
					{{ error }}
				</li>
			</ul>
		</div>
		<!-- Form -->
		<div v-if="!errorLoadingData" class="country-form">
			<h3>Country Information</h3>
			<div>
				<label class="required">Country Name</label>
				<input v-model="countryName" type="text" placeholder="Country Name" />
			</div>
			<div>
				<label class="required">Country Code</label>
				<input v-model="countryCode" type="text" maxlength="2" max placeholder="Country Code" />
			</div>
			<h3>COVID-19 Statistics</h3>
			<div>
				<label class="required">Confirmed</label>
				<input v-model="confirmed" type="number" min="0" placeholder="Confirmed" />
			</div>
			<div>
				<label class="required">Deaths</label>
				<input v-model="deaths" type="number" min="0" placeholder="Deaths" />
			</div>
			<div>
				<label class="required">Recovered</label>
				<input v-model="recovered" type="number" min="0" placeholder="Recovered" />
			</div>
			<div>
				<button v-if="isLoading" :disabled="isLoading" class="btn gray">
					<div class="dot-flashing"></div>
				</button>
				<button v-else class="btn green" :disabled="isLoading" @click="onSave">Save</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { getCountryStatistics, createCountry, updateCountry, saveCountryStatistics } from '@/plugins/api-client';
import { isEmpty, isNotEmpty } from '@/utils/DataUtils';

const props = defineProps({ country: Object, });

const emit = defineEmits(['loading', 'reloadTable']);

const isLoading = ref(false);
const showSuccess = ref(false);
const showError = ref(false);
const msg = ref('');
const errors = ref([]);
const errorLoadingData = ref(false);

const countryId = ref(0);
const countryName = ref('');
const countryCode = ref('');
const confirmed = ref('');
const deaths = ref('');
const recovered = ref('');

if (props.country && isNotEmpty(props.country.id)) {
	// If a valid country id is provided then its data will
	// be populated into the form.
	const response = await getCountryStatistics(props.country.id);
	if (response.success) {
		countryId.value = response.data.id;
		countryName.value = response.data.name;
		countryCode.value = response.data.code;
		if (isNotEmpty(response.data.statistics)) {
			confirmed.value = response.data.statistics.confirmed;
			deaths.value = response.data.statistics.deaths;
			recovered.value = response.data.statistics.recovered;
		}
	} else {
		errorLoadingData.value = true;
		showError.value = true;
		msg.value = 'Unable to load country data.';
	}
}

async function onSave() {

	isLoading.value = false;
	showSuccess.value = false;
	showError.value = false;
	msg.value = '';
	errors.value = [];

	if (!validate()) {
		return;
	}

	emit('loading', true);
	isLoading.value = true;

	let response = null;

	if (countryId.value === 0) {
		response = await createCountry(countryName.value, countryCode.value);
	} else {
		response = await updateCountry(countryId.value, countryName.value, countryCode.value);
	}

	if (response.success) {
		// If the country creation/update is successful
		// another request will be sent to save the country statistics
		countryId.value = response.data.id;
		response = await saveCountryStatistics(countryId.value, confirmed.value, deaths.value, recovered.value);

		isLoading.value = false;
		emit('reloadTable');

		if (response.success) {
			showSuccess.value = true;
			msg.value = '✅ Country has been saved successfully';
		} else {
			showError.value = true;
			msg.value = 'Country has been saved with error(s) related to its statistcs:';
			errors.value = isEmpty(response.data) || isEmpty(response.data.errors) ?
				[] : Object.values(response.data.errors).map((error) => error[0]);
		}

	} else {
		emit('loading', false);
		isLoading.value = false;
		showError.value = true;
		msg.value = response.message;
	}
}

/**
 * This function will validate only the mandatory fields and make sure they are not empty.
 * 
 * @return true if the mandatory fields are not empty
 */
function validate() {
	if (isEmpty(countryName.value)) {
		showError.value = true;
		msg.value = 'The country name field is required.';
		return false;
	}

	if (isEmpty(countryCode.value)) {
		showError.value = true;
		msg.value = 'The country code field is required.';
		return false;
	}

	if (isEmpty(confirmed.value)) {
		showError.value = true;
		msg.value = 'The confirmed cases field is required.';
		return false;
	}

	if (isEmpty(deaths.value)) {
		showError.value = true;
		msg.value = 'The deaths cases field is required.';
		return false;
	}

	if (isEmpty(recovered.value)) {
		showError.value = true;
		msg.value = 'The recovered cases field is required.';
		return false;
	}

	return true;
}
</script>

<style scoped>
.country-form-container>div,
.country-form>div {
	margin: 0.5rem 0;
}

.country-form>div:last-child {
	margin: 1.25rem 0;
}

h3 {
	font-size: 0.8125rem;
	font-weight: 600;
	margin: 0.5rem 0;
	text-transform: uppercase;
	letter-spacing: 0.4px;
	color: var(--vt-c-text-1);
}

label {
	font-size: 0.8125rem;
	font-weight: 500;
}

label.required:after {
	content: " *";
	color: #fd1d7c;
}

input {
	border: 1px solid var(--vt-c-divider);
	border-radius: 4px;
	padding: 8px;
	margin-top: 10px;
	background: transparent;
	transition: background-color 0.5s;
	touch-action: manipulation;
	font-family: inherit;
	font-size: 100%;
	line-height: 1.15;
	width: 100%;
	margin: 4px 0;
}

input:focus {
	outline: 1px solid var(--vt-c-brand);
}

.alert {
	padding: 1rem;
	border-radius: 8px;
	overflow-x: auto;
	transition: color .5s, background-color .5s;
	position: relative;
	font-size: 0.875rem;
	line-height: 1.6;
	font-weight: 500;
	color: #0000008c;
	background-color: var(--vt-c-bg-soft);
}

.alert-text {
	line-height: 1.6;
	font-weight: 500;
	color: #0000008c;
}

.alert-text.success {
	color: var(--vt-c-brand);
}

.alert-text.error {
	color: #fd1d7c;
}

ul {
	padding-left: 1.25rem;
	margin-top: 8px;
}

li {
	position: relative;
}

li:before {
	content: "";
	position: absolute;
	width: 5px;
	height: 5px;
	border-radius: 50%;
	background-color: var(--vt-c-text-3);
	transition: background-color .5s;
	left: -1.25rem;
	top: 0.55rem;
}

.btn {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 0.25rem 1rem;
	font-size: 0.75rem;
	font-weight: 500;
	border-radius: 6px;
	cursor: pointer;
	transition: background-color 0.5s, color 0.5s;
}

.btn:hover {
	transition-duration: 0.2s;
}

.btn.green {
	background-color: var(--vt-c-green);
	color: var(--vt-c-white);
}

.btn.green:hover {
	background-color: var(--vt-c-green-dark);
}

.btn.gray {
	cursor: default;
	background-color: var(--vt-c-bg-mute);
	color: var(--vt-c-text-code);
}

.btn.gray:hover {
	background-color: var(--vt-c-gray-light-4);
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

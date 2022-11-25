<template>
	<div class="countries-table-container">
		<VueGoodTable :columns="columns" :rows="countries" :search-options="searchOptions" :sort-options="sortOptions"
			:pagination-options="paginationOptions" styleClass="vgt-table">
			<!-- Table Actions -->
			<template #table-actions>
				<button @click="onAdd" class="btn green">Add</button>
			</template>
			<!-- Table Row -->
			<template #table-row="props">
				<span v-if="props.column.field === 'edit'">
					<button @click="onEdit(props.row)" class="btn gray">
						Edit
					</button>
				</span>
				<span v-else>
					<div v-if="isLoading" class="loading"></div>
					<span v-else>
						{{ props.formattedRow[props.column.field] }}
					</span>
				</span>
			</template>
		</VueGoodTable>
		<!-- Country Form Modal -->
		<modal :show="show" @close="show = (isLoading === true) ? true : false">
			<template #header class="modal-header">
				<h1>Country Form</h1>
			</template>
			<template #body>
				<CountryForm :country="country" @loading="(status) => isLoading = status" @reloadTable="loadData" />
			</template>
		</modal>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { toCommas } from '@/utils/DataUtils';
import { getSummary } from '@/plugins/api-client';

import { VueGoodTable } from 'vue-good-table-next';
import Modal from '@/components/Modal.vue';
import CountryForm from '@/components/CountryForm.vue';

import '../../css/vue-good-table-custom.css';

const countries = ref([]);
const country = ref({});
const show = ref(false);
const isLoading = ref(false);

await loadData();

async function loadData() {
	isLoading.value = true;
	const { success, data } = await getSummary();
	if (success) {
		countries.value = data.countries;
	}
	isLoading.value = false;
}

function onAdd() {
	country.value = null;
	show.value = true;
}

function onEdit(data) {
	country.value = data;
	show.value = true;
}

/*
	VueGoodTable Configuration
*/
const searchOptions = {
	enabled: true,
	placeholder: 'Search by country name',
};

const sortOptions = {
	enabled: true,
	initialSortBy: { field: 'name', type: 'asc' },
};

const paginationOptions = {
	enabled: true,
	perPage: 10,
	perPageDropdownEnabled: false,
}

const columns = [
	{
		label: 'Country',
		field: 'name',
		sortable: false,
	},
	{
		label: 'Confirmed',
		field: 'statistics.confirmed',
		type: 'number',
		globalSearchDisabled: true,
		formatFn: toCommas,
	},
	{
		label: 'Deaths',
		field: 'statistics.deaths',
		type: 'number',
		sortable: false,
		globalSearchDisabled: true,
		formatFn: toCommas,
	},
	{
		label: 'Recovered',
		field: 'statistics.recovered',
		type: 'number',
		sortable: false,
		globalSearchDisabled: true,
		formatFn: toCommas,
	},
	{
		label: '',
		field: 'edit',
		sortable: false,
		globalSearchDisabled: true,
		width: '50px',
	},
];
</script>

<style scoped>
.countries-table-container {
	width: 100%;
	height: 100%;
}

.btn {
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
	background-color: var(--vt-c-bg-mute);
	color: var(--vt-c-text-code);
}

.btn.gray:hover {
	background-color: var(--vt-c-gray-light-4);
}

.modal-header h1 {
	font-size: 1.25rem;
	font-weight: 600;
	color: var(--vt-c-text-1);
}

.loading {
	background: #eee;
	background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
	border-radius: 5px;
	background-size: 200% 100%;
	animation: 1.5s shine linear infinite;
	height: 15px;
}

@keyframes shine {
	to {
		background-position-x: -200%;
	}
}
</style>

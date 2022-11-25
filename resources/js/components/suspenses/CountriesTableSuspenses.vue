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
				<span>
					<div class="loading"></div>
				</span>
			</template>
		</VueGoodTable>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { VueGoodTable } from 'vue-good-table-next';

import { toCommas } from '@/utils/DataUtils';

import '../../../css/vue-good-table-custom.css';

const perPage = 10;

const countries = ref([]);

for (let i = 0; i < perPage; i++) {
	countries.value.push({});
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
	perPage,
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

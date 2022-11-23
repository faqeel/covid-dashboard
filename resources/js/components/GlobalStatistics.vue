<template>
	<div class="global-statistics">
		<StatisticItem title="Confirmed cases" :value="confirmed" :valueRender="toCommas" />
		<StatisticItem title="Deaths" :value="deaths" :valueRender="toCommas" />
		<StatisticItem title="Recovered" :value="recovered" :valueRender="toCommas" />
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { isEmpty, toCommas } from '@/utils/DataUtils';
import { getGlobalStatistics } from '@/plugins/api-client';

import StatisticItem from './StatisticItem.vue';

const UNDEFINED_VALUE_MESSAGE = '-';

const confirmed = ref(UNDEFINED_VALUE_MESSAGE);
const deaths = ref(UNDEFINED_VALUE_MESSAGE);
const recovered = ref(UNDEFINED_VALUE_MESSAGE);

const { success, data } = await getGlobalStatistics();

if (success) {
	confirmed.value = isEmpty(data.confirmed) || data.confirmed == -1 ?
		UNDEFINED_VALUE_MESSAGE : data.confirmed.toString();
	deaths.value = isEmpty(data.deaths) || data.deaths == -1 ?
		UNDEFINED_VALUE_MESSAGE : data.deaths.toString();
	recovered.value = isEmpty(data.recovered) || data.recovered == -1 ?
		UNDEFINED_VALUE_MESSAGE : data.recovered.toString();
}
</script>

<style scoped>
.global-statistics {
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	text-align: center;
	justify-content: space-between;
	align-items: center;
	padding: 1.25rem 1rem;
	max-width: 960px;
	margin: 0 auto;
	color: var(--vt-c-text-2);
}

@media (min-width: 480px) {
	.global-statistics {
		flex-direction: row;
		text-align: left;
		padding: 2.75rem 2rem;
	}
}
</style>

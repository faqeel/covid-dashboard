import axios from "axios";

import Response from './Response'
import GlobalStatistics from "./models/GlobalStatistics";

/**
 * 
 */
const apiClient = axios.create({
	baseURL: import.meta.env.VITE_APP_URL + '/api/v1/',
});

/**
 * 
 * @returns 
 */
async function getGlobalStatistics() {
	const response = await apiClient.get('global');
	if (response.status === 200) {
		return new Response(true, null, new GlobalStatistics(response.data.data));
	}
	return new Response(false, response.data.message, null);
}

export {
	getGlobalStatistics
}

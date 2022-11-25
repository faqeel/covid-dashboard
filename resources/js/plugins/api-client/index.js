import axios from "axios";

import Response from './Response'
import GlobalStatistics from "./models/GlobalStatistics";
import Summary from "./models/Summary";

/**
 * 
 */
const apiClient = axios.create({
	baseURL: import.meta.env.VITE_APP_URL + '/api/v1/',
});


/**
 * Creates an error response.
 * 
 * @link https://axios-http.com/docs/handling_errors
 * 
 * @param {Error} error - the thrown error object 
 * @param {string} message - the error message
 * @returns {Response} - an internal API response object
 */
function errorResponse(error, message) {
	let data = null;
	if (error.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		if (error.response.status === 422) {
			data = error.response.data;
			message = error.response.data.message;
		} else {
			message += ` (Status code: ${error.response.status})`;
		}
	} else if (error.request) {
		// The request was made but no response was received
		message += ' (No response)';
	}
	return new Response(false, message, data);
}

/**
 * 
 * @returns 
 */
async function getGlobalStatistics() {
	try {
		const response = await apiClient.get('global');
		if (response.status === 200) {
			return new Response(true, null, new GlobalStatistics(response.data.data));
		}
		return new Response(false, response.data.message, null);
	} catch (error) {
		return errorResponse(error, 'Error getting the global statistics.');
	}
}

/**
 * Calls /api/v1/summary endpoint.
 * 
 * This function will call the /api/v1/summary endpoint. If a successful response is
 * received, the HTTP response will be converted to a Summary object, and encapsulate the
 * created summary object in an internal API response object.
 * 
 * @see {Summary} - the data that will be encapsulated in the internal API response
 * @returns {Response} - an internal API response object
 */
async function getSummary() {
	try {
		const response = await apiClient.get('summary');
		if (response.status === 200) {
			return new Response(true, null, new Summary(response.data.data));
		}
		return new Response(false, response.data.message, null);
	} catch (error) {
		return errorResponse(error, 'Error getting statistics summary.');
	}
}

export {
	getGlobalStatistics,
	getSummary,
}

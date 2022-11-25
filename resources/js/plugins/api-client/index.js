import axios from "axios";

import Response from './Response'
import GlobalStatistics from "./models/GlobalStatistics";
import Summary from "./models/Summary";
import Country from "./models/Country";

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

/**
 * Calls POST /api/v1/country endpoint.
 * 
 * This function will call the /api/v1/country endpoint to create a new country.
 * 
 * @param {string} name - the name of the country
 * @param {string} code - the code of the country 
 * @returns {Response} - an internal API response object
 */
async function createCountry(name, code) {
	try {
		const response = await apiClient.post('country', { name, code });
		if (response.status === 201) {
			return new Response(true, null, new Country(response.data.data));
		}
		return new Response(false, response.data.message, null);
	} catch (error) {
		return errorResponse(error, 'Error creating a new country.');
	}
}

/**
 * Calls PUT /api/v1/country endpoint.
 * 
 * This function will call the /api/v1/country endpoint to update an existing country.
 * 
 * @param {number} id - the id of the country
 * @param {string} name - the name of the country
 * @param {string} code - the code of the country 
 * @returns {Response} - an internal API response object
 */
async function updateCountry(id, name, code) {
	try {
		const response = await apiClient.put(`country/${id}`, { name, code });
		if (response.status === 200) {
			return new Response(true, null, new Country(response.data.data));
		}
		return new Response(false, response.data.message, null);
	} catch (error) {
		return errorResponse(error, 'Error updating the country.');
	}
}

/**
 * Calls POST /api/v1/country/{countryId}/statistic endpoint.
 * 
 * This function will call the /api/v1/country/{countryId}/statistic endpoint to update
 * or create a country statistics.
 * 
 * @param {number} countryId - the id of the country
 * @param {number} confirmed - the number of the confirmed cases
 * @param {number} deaths - the number of the deaths cases
 * @param {number} recovered - the number of the recovered cases
 * @returns {Response} - an internal API response object
 */
async function saveCountryStatistics(countryId, confirmed, deaths, recovered) {
	try {
		const response = await apiClient.post(`country/${countryId}/statistic`, { confirmed, deaths, recovered });
		if (response.status === 200) {
			return new Response(true, null, new Country(response.data.data));
		}
		return new Response(false, response.data.message, null);
	} catch (error) {
		return errorResponse(error, 'Error saving the country statistics.');
	}
}

export {
	getGlobalStatistics,
	getSummary,
	createCountry,
	updateCountry,
	saveCountryStatistics,
}

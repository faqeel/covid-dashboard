import axios from "axios";

import Response from './Response'

/**
 * 
 */
const apiClient = axios.create({
	baseURL: import.meta.env.VITE_APP_URL + '/api/v1/',
});


export {}

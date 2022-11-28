/**
 * Standardize API responses.
 *
 * The Response class can be used to standardize API responses internally by translating
 * an API response into three properties: success, message, and data.
 *
 */
export default class Response {
    /**
     * Constructs a new Responses.
     *
     * @param {boolean} success - true if a response status code received as expected
     * @param {string} message - the message provided in the response body, if any
     * @param {*} data - the response body
     */
    constructor(success, message, data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}

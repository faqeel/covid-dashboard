/**
 * Add commas to a string of numbers.
 * "123456789" will be converted to "123,456,789"
 *
 * @param {String} str the string of numbers to be formatted
 * @returns The formmated string of numbers
 */
export function toCommas(str) {
	if (str === undefined || str === null) return str;
	return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 
 * @param {*} object 
 * @returns 
 */
export function isEmpty(object) {
	if (object === null || object === undefined) {
		return true;
	}
	return false;
}

/**
 * 
 * @param {*} object 
 * @returns 
 */
export function isNotEmpty(object) {
	return !isEmpty(object);
}

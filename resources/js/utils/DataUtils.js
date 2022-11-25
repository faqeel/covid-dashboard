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
 * Determine whether the given object is empty.
 * 
 * @param {*} object - the object to check
 * @returns - true if the object is null or empty
 */
export function isEmpty(object) {
	if (object === null || object === undefined) {
		return true;
	}
	if (typeof object === 'string') {
		return object.trim().length === 0;
	}
	return false;
}

/**
 * Determine whether the given object is not empty.
 * 
 * @param {*} object - the object to check
 * @returns - true if the object is not empty
 */
export function isNotEmpty(object) {
	return !isEmpty(object);
}

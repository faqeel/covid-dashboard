/**
 * Determine whether the given object is null or undefined.
 *
 * @param {*} object - the object to check
 * @returns - true if the object is null or undefined
 */
export function isEmpty(object) {
    if (object === null || object === undefined) {
        return true;
    }
    return false;
}

export const HttpStatusCode = {
    OK: 200,
    CREATED: 201,
    UNPROCESSABLE_ENTITY: 422,
};

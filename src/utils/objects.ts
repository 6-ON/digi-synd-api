/**
 * @description 
 * @returns single level object
 */
export function flattenObject(obj:any, prefix = "") {
	const flatObject = {};
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			const propName = prefix ? `${prefix}.${key}` : key;
			if (typeof obj[key] === "object" && obj[key] !== null) {
				// Recursively flatten nested objects
				Object.assign(flatObject, flattenObject(obj[key], propName));
			} else {
				// Assign the flat property
				flatObject[propName] = obj[key];
			}
		}
	}

	return flatObject;
}

import { isEmpty } from "../Utils";

export default class Statistics {

	constructor(response) {
		const UNDEFINED_VALUE_MESSAGE = '-';
		this.confirmed = isEmpty(response.confirmed) || response.confirmed == -1 ?
			UNDEFINED_VALUE_MESSAGE : response.confirmed;
		this.deaths = isEmpty(response.deaths) || response.deaths == -1 ?
			UNDEFINED_VALUE_MESSAGE : response.deaths;
		this.recovered = isEmpty(response.recovered) || response.recovered == -1 ?
			UNDEFINED_VALUE_MESSAGE : response.recovered;
	}

}

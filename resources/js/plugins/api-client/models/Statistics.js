import { isEmpty } from "../Utils";

export default class Statistics {

	constructor(response) {
		const UNDEFINED_VALUE = '-';
		if (response) {
			this.confirmed = isEmpty(response.confirmed) || response.confirmed == -1 ?
				UNDEFINED_VALUE : response.confirmed;
			this.deaths = isEmpty(response.deaths) || response.deaths == -1 ?
				UNDEFINED_VALUE : response.deaths;
			this.recovered = isEmpty(response.recovered) || response.recovered == -1 ?
				UNDEFINED_VALUE : response.recovered;
		} else {
			this.confirmed = this.deaths = this.recovered = UNDEFINED_VALUE;
		}
	}

}

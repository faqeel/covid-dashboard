import Statistics from "./Statistics";

export default class Country {

	constructor(response) {
		this.id = response.id;
		this.name = response.name;
		this.code = response.code;
		this.statistics = new Statistics(response.statistics);
	}

}

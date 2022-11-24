import GlobalStatistics from "./GlobalStatistics";
import Country from "./Country";

export default class Summary {

	constructor(response) {
		this.global = new GlobalStatistics(response.global);
		this.countries = response.countries.map((country) => new Country(country));
	}

}

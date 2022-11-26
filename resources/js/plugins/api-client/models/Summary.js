import GlobalStatistics from "./GlobalStatistics";
import Country from "./Country";
import { isEmpty } from "../Utils";

export default class Summary {

	constructor(response) {
		this.global = isEmpty(response.global) ? null : new GlobalStatistics(response.global);
		this.countries = response.countries.map((country) => new Country(country));
	}

}

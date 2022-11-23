export default class GlobalStatistics {

	constructor(response) {
		this.stat_date = response.stat_date;
		this.confirmed = response.confirmed;
		this.deaths = response.deaths;
		this.recovered = response.recovered;
	}

}

import { isEmpty } from '../Utils';

/**
 *
 */
export default class GlobalStatistics {
    /**
     *
     * @param {*} stat_date
     * @param {*} confirmed
     * @param {*} deaths
     * @param {*} recovered
     */
    constructor(stat_date, confirmed, deaths, recovered) {
        this.stat_date = stat_date;
        this.confirmed = confirmed;
        this.deaths = deaths;
        this.recovered = recovered;
    }
}

/**
 *
 */
export class GlobalStatisticsFactory {
    /**
     *
     * @param {*} response
     * @returns
     */
    static create(response) {
        if (isEmpty(response)) {
            return null;
        }
        const { stat_date, confirmed, deaths, recovered } = response;
        return new GlobalStatistics(stat_date, confirmed, deaths, recovered);
    }
}

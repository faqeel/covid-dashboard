import { isEmpty } from '../Utils';

export default class Statistics {
    constructor(confirmed, deaths, recovered) {
        this.confirmed = confirmed;
        this.deaths = deaths;
        this.recovered = recovered;
    }
}

/**
 *
 */
export class StatisticsFactory {
    /**
     *
     * @param {*} response
     * @returns
     */
    static create(response) {
        if (isEmpty(response)) {
            return null;
        }
        const { confirmed, deaths, recovered } = response;
        return new Statistics(confirmed, deaths, recovered);
    }
}

import { GlobalStatisticsFactory } from './GlobalStatistics';
import { CountryFactory } from './Country';
import { isEmpty } from '../Utils';

/**
 *
 */
export default class Summary {
    /**
     *
     * @param {*} global
     * @param {*} countries
     */
    constructor(global, countries) {
        this.global = GlobalStatisticsFactory.create(global);
        this.countries = countries.map((country) =>
            CountryFactory.create(country)
        );
    }
}

/**
 *
 */
export class SummaryFactory {
    /**
     *
     * @param {*} response
     * @returns
     */
    static create(response) {
        if (isEmpty(response)) {
            return null;
        }
        const { global, countries } = response;
        return new Summary(global, countries);
    }
}

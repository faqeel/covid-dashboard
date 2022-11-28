import { StatisticsFactory } from './Statistics';
import { isEmpty } from '../Utils';

/**
 *
 */
export default class Country {
    /**
     *
     * @param {*} id
     * @param {*} name
     * @param {*} code
     * @param {*} statistics
     */
    constructor(id, name, code, statistics) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.statistics = StatisticsFactory.create(statistics);
    }
}

/**
 *
 */
export class CountryFactory {
    /**
     *
     * @param {*} response
     * @returns
     */
    static create(response) {
        if (isEmpty(response)) {
            return null;
        }
        const { id, name, code, statistics } = response;
        return new Country(id, name, code, statistics);
    }
}

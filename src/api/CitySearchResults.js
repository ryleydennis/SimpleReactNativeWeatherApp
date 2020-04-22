import { GetData } from './APIHelperFunctions'

export default class CitySearchResults {
    constructor(searchResults) {
        var results = new GetData(searchResults, 'Results')

        this.names = []
        for (city of results) {
            this.names.push(GetData(city, 'name'))
        }

        this.names = this.names.slice(0,6)
    }
}


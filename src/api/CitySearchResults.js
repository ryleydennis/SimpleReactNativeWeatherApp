import GetData from './APIHelperFunctions'

export default class CitySearchResults {
    constructor(searchResults) {
        var results = GetData(searchResults, 'Results')

        this.names = []
        for (city in results) {
            names.append(GetData(city, 'name'))
        }
        
    }
}


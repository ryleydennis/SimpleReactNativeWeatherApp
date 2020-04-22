import { GetData } from './APIHelperFunctions'

export default class CitySearchResults {
    constructor(searchResults) {
        var results = new GetData(searchResults, 'Results')

        this.cities = []
        for (city of results) {
            var name = GetData(city, 'name')
            var lat = GetData(city, 'lat')
            var lon = GetData(city, 'lon')
            this.cities.push(
                {
                    name: name,
                    lat: lat,
                    lon: lon
                })
        }

        this.cities = this.cities.slice(0,8)
    }
}


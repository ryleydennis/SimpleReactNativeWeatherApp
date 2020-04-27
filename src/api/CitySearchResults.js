import { GetData } from './APIHelperFunctions'

export default class CitySearchResults {
    constructor(searchResults) {
        var results = new GetData(searchResults, 'Results')

        this.cities = []
        for (city of results) {
            var name = GetData(city, 'name')
            var lat = GetData(city, 'lat')
            var lon = GetData(city, 'lon')
            var timeZone = GetData(city, 'tzs')

            if (this.verifyName(name) && this.verifyLat(lat) && this.verifyLon(lon)) {
                this.cities.push(
                    {
                        name: name,
                        lat: lat,
                        lon: lon,
                        timeZone: timeZone,
                    })
            }
        }

        this.cities = this.cities.slice(0,20)
    }

    verifyLat(lat) {
        return !isNaN(lat) && lat >= -90 && lat <= 90
    }

    verifyLon(lon) {
        return !isNaN(lon) && lon >= -180 && lon <= 180
    }

    verifyName(name) {
        return name != ''
    }
}



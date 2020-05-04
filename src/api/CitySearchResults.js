import { GetData } from './APIHelperFunctions';

export default class CitySearchResults {
  constructor(searchResults) {
    var results = GetData(searchResults, 'Results');

    this.cities = [];

    if (results !== undefined && results.length !== 0) {
      results.forEach((city) => {
        var name = GetData(city, 'name');
        var lat = GetData(city, 'lat');
        var lon = GetData(city, 'lon');
        var timeZone = GetData(city, 'tzs');

        if (verifyName(name) && verifyLat(lat) && verifyLon(lon)) {
          this.cities.push({
            name,
            lat,
            lon,
            timeZone,
          });
        }
      });
    }
  }
}

const verifyLat = (lat) => !Number.isNaN(lat) && lat >= -90 && lat <= 90;

const verifyLon = (lon) => !Number.isNaN(lon) && lon >= -180 && lon <= 180;

const verifyName = (name) => name !== '';

import GetData from './APIHelperFunctions';

export default class CitySearchResults {
  constructor(searchResults) {
    var results = new GetData(searchResults, 'Results');

    this.cities = [];
    results.foreach((city) => {
      var name = GetData(city, 'name');
      var lat = GetData(city, 'lat');
      var lon = GetData(city, 'lon');
      var timeZone = GetData(city, 'tzs');

      if (this.verifyName(name) && this.verifyLat(lat) && this.verifyLon(lon)) {
        this.cities.push({
          name,
          lat,
          lon,
          timeZone,
        });
      }
    });

    this.cities = this.cities.slice(0, 20);
  }

  static verifyLat(lat) {
    return !Number.isNaN(lat) && lat >= -90 && lat <= 90;
  }

  static verifyLon(lon) {
    return !Number.isNaN(lon) && lon >= -180 && lon <= 180;
  }

  static verifyName(name) {
    return name !== '';
  }
}

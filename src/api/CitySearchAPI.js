import CitySearchResults from '../model/CitySearchResults';

export default class CitySearchAPI {
  static searchCities(cityName, callback) {
    var timeStamp = Date.now();
    var url = new URL(
      'https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php'
    );
    var params = { location: cityName };

    if (cityName != null) {
      Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
      fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'devru-latitude-longitude-find-v1.p.rapidapi.com',
          'x-rapidapi-key':
            '1b07f437b5mshe79215d28fc6a1cp1c5028jsn5edcef5b77d5',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          var cityList = new CitySearchResults(data).cities;
          callback(cityList, timeStamp);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }
}

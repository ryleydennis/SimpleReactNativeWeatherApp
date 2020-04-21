import CitySearchResults from './CitySearchResults'

export default function searchCities(cityName, context, callback) {
    if (cityName != null) {
        // var url = new URL('https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php')
        // var params = {location: cityName}
        // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    
        var url = new URL('https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php')
        var params = {location: cityName}
        url.search = new URLSearchParams(params).toString();

        fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "devru-latitude-longitude-find-v1.p.rapidapi.com",
                "x-rapidapi-key": "1b07f437b5mshe79215d28fc6a1cp1c5028jsn5edcef5b77d5"
            }
        })
            .then(response => response.json())
            .then(data => {
                var cityList = CitySearchResults(data)
                callback(true, context, cityList)
            })
            .catch(err => {
                console.log(err);
                callback(false, context)
            });
    }
}
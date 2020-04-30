import Forecast from "./Forecast";
import Weather from './Weather';
import HourlyWeather from './HourlyWeather';


function fetchSummaryData(city, units, callback) {
    var url = new URL('https://community-open-weather-map.p.rapidapi.com/weather');
    var params = {
        lat: city.lat,
        lon: city.lon,
        units: units.value,
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "1b07f437b5mshe79215d28fc6a1cp1c5028jsn5edcef5b77d5"
        }
    })
        .then(response => response.json())
        .then(data => {
            callback(new Weather(data, units))
        })
        .catch(err => {
            console.log(err);
        });
}

function fetchForecastData(city, units, callback) {
    const count = 7
    var url = new URL('https://community-open-weather-map.p.rapidapi.com/forecast/daily');
    var params = {
        lat: city.lat,
        lon: city.lon,
        units: units.value,
        cnt: count,
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "1b07f437b5mshe79215d28fc6a1cp1c5028jsn5edcef5b77d5"
        }
    })
        .then(response => response.json())
        .then(data => {
            callback(new Forecast(data))
        })
        .catch(err => {
            console.log(err);
        });
}

function fetchHourlyData(city, units) {
    var url = new URL('https://community-open-weather-map.p.rapidapi.com/forecast')
    var params = {
        lat: city.lat,
        lon: city.lon,
        units: units.value,

    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "1b07f437b5mshe79215d28fc6a1cp1c5028jsn5edcef5b77d5"
        }
    })
        .then(response => response.json())
        .then(data => {
            callback(new HourlyWeather(data))
        })
        .catch(err => {
            console.log(err);
        });
}

export {fetchForecastData, fetchSummaryData, fetchHourlyData}

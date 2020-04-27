import Forecast from "./Forecast";
import Weather from './Weather';
import HourlyWeather from './HourlyWeather';

export default class WeatherAPI {
    static fetchWeatherData(city, context, callback, units) {
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
                var weather = new Weather(data, units)
                callback(true, context, weather)
            })
            .catch(err => {
                console.log(err);
                callback(false, context)
            });
    }

    static fetchWeatherForecast(city, context, callback, units) {
        const count = 7
        var url = new URL('https://community-open-weather-map.p.rapidapi.com/forecast/daily');
        var params = {
            lat: city.lat,
            lon: city.lon,
            units: units.value,
            cnt: 7,
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
                var forecast = new Forecast(data)
                callback(true, context, forecast)
            })
            .catch(err => {
                console.log(err);
                callback(false, context)
            });
    }

    static fetchHourlyForecast(city, context, callback, units) {
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
                var forecast = new HourlyWeather(data)
                callback(true, context, forecast)
            })
            .catch(err => {
                console.log(err);
                callback(false, context)
            });
    }
}
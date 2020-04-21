import Forecast from "./Forecast";
import Weather from './Weather';
import HourlyWeather from './HourlyWeather';

export default class WeatherAPI {
    static fetchWeatherData(context, callback) {
        fetch("https://community-open-weather-map.p.rapidapi.com/weather?units=imperial&mode=xml%252C%20html&q=Ann%20Arbor", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "1b07f437b5mshe79215d28fc6a1cp1c5028jsn5edcef5b77d5"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Weather API call: ' + ((data != null && data.id == '4984247') ? 'good' : 'bad' ))
                var weather = new Weather(data)
                callback(true, context, weather)
            })
            .catch(err => {
                console.log(err);
                callback(false, context)
            });
    }

    static fetchWeatherForecast(context, callback) {
        fetch("https://community-open-weather-map.p.rapidapi.com/forecast/daily?cnt=7&units=imperial&id=4984247", {
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

    static fetchHourlyForecast(context, callback) {
        fetch("https://community-open-weather-map.p.rapidapi.com/forecast?units=imperial&id=4984247", {
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
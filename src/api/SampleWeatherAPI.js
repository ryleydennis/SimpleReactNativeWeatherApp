import {weatherSummarySample} from '../sampleJSON/WeatherSummarySample'
import weatherForecastSample from '../sampleJSON/WeatherForecastSample'
import weatherHourlySample from '../sampleJSON/WeatherHourlySample'

import Forecast from './Forecast'
import Summary from './Weather'
import Hourly from './HourlyWeather'

export default class SampleWeatherAPI {
    static fetchSummarySampleData(callback, context, units) {
        callback(true, context, new Summary(weatherSummarySample, units))
    }

    static fetchForecastSampleData(callback, context) {
        callback(true, context, new Forecast(weatherForecastSample))
    }

    static fetchHourlySampleData(callback, context) {
        callback(true, context, new Hourly(weatherHourlySample))
    }
}
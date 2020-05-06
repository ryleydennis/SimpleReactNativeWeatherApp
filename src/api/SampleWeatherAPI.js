import { weatherSummarySample } from '../tests/sampleJSON/WeatherSummarySample';
import weatherForecastSample from '../tests/sampleJSON/WeatherForecastSample';
import weatherHourlySample from '../tests/sampleJSON/WeatherHourlySample';

import Forecast from './Forecast';
import Summary from '../model/WeatherSummary';
import Hourly from '../model/WeatherHourly';

export default class SampleWeatherAPI {
  static fetchSummarySampleData(callback, context, units) {
    callback(true, context, new Summary(weatherSummarySample, units));
  }

  static fetchForecastSampleData(callback, context) {
    callback(true, context, new Forecast(weatherForecastSample));
  }

  static fetchHourlySampleData(callback, context) {
    callback(true, context, new Hourly(weatherHourlySample));
  }
}

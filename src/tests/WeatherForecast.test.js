import Forecast from '../model/WeatherForecast';
import Sample from './sampleJSON/WeatherForecastSample';
import DayWeather from '../model/DayWeather';

const forecast = new Forecast(Sample);
test('Forecast has correct data', () => {
  expect(forecast.days).toHaveLength(7);
});

test('Forecast has correct data', () => {
  expect(forecast.days[0]).toEqual(new DayWeather(Sample.list[0], 0));
});

test('Forecast with bad data is empty', () => {
  const badForecast = new Forecast();
  expect(badForecast.days).toStrictEqual([]);
});

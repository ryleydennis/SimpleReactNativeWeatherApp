import DayWeather from '../model/DayWeather';
import Sample from './sampleJSON/WeatherForecastSample';

const daySample = Sample.list[0];
const dayWeather = new DayWeather(daySample, 0);

test('DayWeather has correct data', () => {
  expect(dayWeather.index).toBe(0);
  expect(dayWeather.lo).toBe('48°');
  expect(dayWeather.hi).toBe('63°');
  expect(dayWeather.description).toBe(daySample.weather[0].description);
  expect(dayWeather.icon).toBe(daySample.weather[0].icon);
});

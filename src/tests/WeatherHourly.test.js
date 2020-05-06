import WeatherHourly from '../model/WeatherHourly';
import Sample from './sampleJSON/WeatherHourlySample';


describe('Hourly test with good sample data', () => {
  const hourly = new WeatherHourly(Sample);
  test('temps have correct length', () => {
    expect(hourly.temps).toHaveLength(Sample.list.length);
  });

  test('timeStamps have correct length', () => {
    expect(hourly.timeStamps).toHaveLength(Sample.list.length);
  });

  test('has correct data', () => {
    for (var i = 0; i < hourly.temps.length; i += 1) {
      var correctTimeStamp = new Date(Sample.list[i].dt * 1000);
      expect(hourly.timeStamps[i]).toStrictEqual(correctTimeStamp);

      var correctTemp = Sample.list[i].main.temp.toFixed(0);
      expect(hourly.temps[i]).toBe(correctTemp);
    }
  });
});

describe('Hourly test with bad sample data', () => {
  const badHourly = new WeatherHourly({});

  expect(badHourly.temps).toStrictEqual([]);
  expect(badHourly.timeStamps).toStrictEqual([]);
});

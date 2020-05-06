import Weather from '../model/WeatherSummary';
import Sample from './sampleJSON/WeatherSummarySample';


describe('Weather Summary with good sample data', () => {
  const unit = { value: 'imperial', label: 'Fahrenheit', abbr: 'F' };
  const summary = new Weather(Sample, unit);
  test('Summary has correct data', () => {
    expect(summary.name).toBe(Sample.name);
    expect(summary.unit).toStrictEqual(unit);
    expect(summary.id).toBe(Sample.id);
    expect(summary.icon).toBe(Sample.weather[0].icon);
    expect(summary.description).toBe(Sample.weather[0].description);
    expect(summary.temp).toBe(`${Sample.main.temp.toFixed(0)}°`);
    expect(summary.hi).toBe(`${Sample.main.temp_max.toFixed(0)}°`);
    expect(summary.lo).toBe(`${Sample.main.temp_min.toFixed(0)}°`);
    expect(summary.humidity).toBe(`${Sample.main.humidity}%`);
    expect(summary.feelsLike).toBe(`${Sample.main.feels_like.toFixed(0)}°`);
    expect(summary.pressure).toBe(`${Sample.main.pressure}hPa`);
    expect(summary.speed).toBe(`${Sample.wind.speed.toFixed(0)} mph`);
    expect(summary.sunrise).toBe(Sample.sys.sunrise);
    expect(summary.sunset).toBe(Sample.sys.sunset);
  });

  test('getSunrise parses correctly', () => {
    expect(summary.sunrise).toBe(1588156332);
    expect(summary.getSunrise()).toBe('6:32 AM');
  });

  test('getSunset parses correctly', () => {
    expect(summary.sunset).toBe(1588206722);
    expect(summary.getSunset()).toBe('8:32 PM');
  });
});

describe('Weather summary with bad sample data', () => {
  const summary = new Weather();
  test('Summary has expected data', () => {
    expect(summary.name).toStrictEqual('');
    expect(summary.unit.abbr).toStrictEqual('');
    expect(summary.unit.label).toStrictEqual('');
    expect(summary.unit.value).toStrictEqual('');
    expect(summary.id).toStrictEqual('');
    expect(summary.icon).toStrictEqual('');
    expect(summary.description).toStrictEqual('');
    expect(summary.temp).toBe('-°');
    expect(summary.hi).toBe('-°');
    expect(summary.lo).toBe('-°');
    expect(summary.humidity).toBe('-%');
    expect(summary.feelsLike).toBe('-°');
    expect(summary.pressure).toBe('-hPa');
    expect(summary.speed).toBe('- mph');
    expect(summary.sunrise).toStrictEqual('');
    expect(summary.sunset).toStrictEqual('');
  });
});

import SearchSample from './sampleJSON/CitySearchSample';
import CityResults, { verifyLat, verifyLon, verifyName } from '../model/CitySearchResults';

const results = new CityResults(SearchSample);
const sample = SearchSample.Results;

test('CitySearchResults parses correctly with good data', () => {
  expect(results.cities).toHaveLength(17);
  for (var i = 0; i < results.length; i += 1) {
    expect(results.cities[i].name).toBe(sample[i].name);
    expect(results.cities[i].lat).toBe(sample[i].lat);
    expect(results.cities[i].lon).toBe(sample[i].lon);
    expect(results.cities[i].tzs).toBe(sample[i].tzs);
  }
});

describe('verifyLat verifies lat is in range', () => {
  // Latitudes range from -90 to 90 degrees
  test('true for lat in range', () => {
    expect(verifyLat(0)).toBe(true);
    expect(verifyLat(85)).toBe(true);
    expect(verifyLat(90)).toBe(true);
    expect(verifyLat(-90)).toBe(true);
  });

  test('false for lat not in range', () => {
    expect(verifyLat(-91)).toBe(false);
    expect(verifyLat(91)).toBe(false);
  });

  test('only accepts numbers', () => {
    expect(verifyLat('Some Text')).toBe(false);
  });
});

describe('verifyLon returns true or false for lons', () => {
  // Longitudes can range between -180 and 180 degrees
  test('true for lon in range', () => {
    expect(verifyLon(-180)).toBe(true);
    expect(verifyLon(-90)).toBe(true);
    expect(verifyLon(0)).toBe(true);
    expect(verifyLon(90)).toBe(true);
    expect(verifyLon(180)).toBe(true);
  });

  test('false for lon not in range', () => {
    expect(verifyLon(-181)).toBe(false);
    expect(verifyLon(181)).toBe(false);
    expect(verifyLon(180.75)).toBe(false);
  });
  test('only accepts numbers', () => {
    expect(verifyLon('Some Text')).toBe(false);
  });
});

test('Verifyname returns true for a nonempty string', () => {
  expect(verifyName('Some Text')).toBe(true);
});

test('Verifyname returns false for an empty string', () => {
  expect(verifyName('')).toBe(false);
});

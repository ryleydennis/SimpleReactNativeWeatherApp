import { SET_WEATHER_SUMMARY, SET_WEATHER_HOURLY, SET_WEATHER_FORECAST, SET_CITY, SET_TEMP_UNIT } from './actionTypes';

export const setWeatherSummary = (weatherSummary) => ({
  type: SET_WEATHER_SUMMARY,
  payload: weatherSummary,
});

export const setWeatherHourly = (weatherHourly) => ({
  type: SET_WEATHER_HOURLY,
  payload: weatherHourly,
});

export const setWeatherForecast = (weatherForecast) => ({
  type: SET_WEATHER_FORECAST,
  payload: weatherForecast,
});

export const setCity = (city) => ({
  type: SET_CITY,
  payload: city,
});

export const setUnit = (unit) => ({
  type: SET_TEMP_UNIT,
  payload: unit,
});

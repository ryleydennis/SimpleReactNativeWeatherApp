import Weather from '../model/WeatherSummary';
import Forecast from '../model/WeatherForecast';
import Hourly from '../model/WeatherHourly';

import { SET_WEATHER_SUMMARY, SET_WEATHER_HOURLY, SET_WEATHER_FORECAST } from '../actions/actionTypes';

const weatherSummary = (state = new Weather(), action) => {
  switch (action.type) {
    case SET_WEATHER_SUMMARY:
      return action.payload;
    default:
      return state;
  }
};

const weatherForecast = (state = new Forecast(), action) => {
  switch (action.type) {
    case SET_WEATHER_FORECAST:
      return action.payload;
    default:
      return state;
  }
};

const weatherHourly = (state = new Hourly(), action) => {
  switch (action.type) {
    case SET_WEATHER_HOURLY:
      return action.payload;
    default:
      return state;
  }
};

export { weatherSummary, weatherForecast, weatherHourly };

import Weather from '../model/Weather';
import Forecast from '../model/Forecast';
import Hourly from '../model/HourlyWeather';

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

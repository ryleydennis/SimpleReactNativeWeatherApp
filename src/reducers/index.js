import { combineReducers } from 'redux';
import { weatherSummary, weatherForecast, weatherHourly } from './weatherReducers';
import { cityState, unitState } from './cityReducers';

export default combineReducers({
  weatherSummary,
  weatherForecast,
  weatherHourly,
  cityState,
  unitState,
});

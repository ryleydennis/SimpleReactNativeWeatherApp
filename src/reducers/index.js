import { combineReducers } from 'redux'
import { weatherSummary, weatherForecast, weatherHourly } from './weatherReducers'

export default combineReducers({
    weatherSummary,
    weatherForecast,
    weatherHourly
})
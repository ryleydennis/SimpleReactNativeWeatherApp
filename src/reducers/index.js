import { combineReducers } from 'redux'
import { weatherSummary, weatherForecast, weatherHourly } from './weatherReducers'
import { city, unit } from './cityReducers'

export default combineReducers({
    weatherSummary,
    weatherForecast,
    weatherHourly,
    city,
    unit,
})
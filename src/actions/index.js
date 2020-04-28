import { SET_WEATHER_SUMMARY, SET_WEATHER_HOURLY, SET_WEATHER_FORECAST } from './actionTypes'

export const setWeatherSummary = weatherSummary => ({
    type: SET_WEATHER_SUMMARY,
    payload: weatherSummary
})

export const setWeatherHourly = weatherHourly => ({
    type: SET_WEATHER_HOURLY,
    payload: weatherHourly
})

export const setWeatherForecast = weatherForecast => ({
    type: SET_WEATHER_FORECAST, 
    payload: weatherForecast 
})
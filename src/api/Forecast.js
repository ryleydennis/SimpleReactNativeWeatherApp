import { GetData } from './APIHelperFunctions';
import DayWeather from './DayWeather';

export default class Forecast {
  constructor(forecastData) {
    this.days = [];
    // for (let i = 0; i < this.days.length; i += 1) {
    //   this.days[i] = new DayWeather();
    // }

    if (forecastData !== undefined) {
      const forecast = Array.isArray(forecastData) ? forecastData[0] : forecastData;
      const unparsedDays = GetData(forecast, 'list');
      if (unparsedDays.length > 0) {
        for (let i = 0; i < unparsedDays.length; i += 1) {
          this.days[i] = new DayWeather(unparsedDays[i], i);
        }
      }
    }
  }
}

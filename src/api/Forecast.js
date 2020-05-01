import GetData from './APIHelperFunctions';

export default class Forecast {
  constructor(forecastData) {
    this.days = [];

    for (let i = 0; i < this.days.length; i += 1) {
      this.days[i] = new DayWeather();
    }

    if (forecastData !== undefined) {
      const forecast = Array.isArray(forecastData) ? forecastData[0] : forecastData;
      const unparsedDays = GetData(forecast, 'list');
      if (Array.isArray(unparsedDays) && unparsedDays.length > 0) {
        for (let i = 0; i < unparsedDays.length; i += 1) {
          this.days[i] = new DayWeather(unparsedDays[i], i);
        }
      }
    }
  }
}

const DayWeather = (rawDay, index) => {
  this.index = index;
  this._temp = GetData(rawDay, 'temp');

  this.lo = GetData(this._temp, 'min', '-', '°');
  this.hi = GetData(this._temp, 'max', '-', '°');

  this._weather = rawDay != null && rawDay.weather[0] != null ? rawDay.weather[0] : null;
  this.description = GetData(this._weather, 'description');
  this.icon = GetData(this._weather, 'icon');

  function getIcon() {
    if (this.icon === '') {
      return '';
    }
    return `https://openweathermap.org/img/wn/${this.icon}@2x.png`;
  }
};

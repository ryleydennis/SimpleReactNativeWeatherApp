const placeHolder = '-';

export default class Forecast {
  constructor(forecastData) {
    this.days = [];

    for (let i = 0; i < this.days.length; i += 1) {
      this.days[i] = new DayWeather();
    }

    if (forecastData !== undefined) {
      const forecast = Array.isArray(forecastData) ? forecastData[0] : forecastData;
      const unparsedDays = this.getData(forecast, 'list');
      if (Array.isArray(unparsedDays) && unparsedDays.length > 0) {
        for (let i = 0; i < unparsedDays.length; i += 1) {
          this.days[i] = new DayWeather(unparsedDays[i], i);
        }
      }
    }
  }

  static getData(parent, child, suffix, decimalPlace) {
    var data = '';

    if (parent != null && parent[child] != null) {
      data = parent[child];

      if (decimalPlace != null) {
        data = data.toFixed(decimalPlace);
      }
    } else {
      data = placeHolder;
    }

    if (suffix != null) {
      data += suffix;
    }

    return data;
  }
}

const DayWeather = (rawDay, index) => {
  this.index = index;
  this._temp = this.getData(rawDay, 'temp');

  this.lo = getData(this._temp, 'min', '°', '-');
  this.hi = this.getData(this._temp, 'max', '°', '-');

  this._weather = rawDay != null && rawDay.weather[0] != null ? rawDay.weather[0] : null;
  this.description = this.getData(this._weather, 'description');
  this.icon = this.getData(this._weather, 'icon');

  function getIcon() {
    if (this.icon === '') {
      return '';
    }
    return `https://openweathermap.org/img/wn/${this.icon}@2x.png`;
  }
};

function getData(parent, child, suffix, decimalPlace) {
  var data = '';

  if (parent != null && parent[child] != null) {
    data = parent[child];

    if (decimalPlace != null) {
      data = data.toFixed(decimalPlace);
    }
  } else {
    data = placeHolder;
  }

  if (suffix != null) {
    data += suffix;
  }

  return data;
}

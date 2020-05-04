import { GetData } from './APIHelperFunctions';

export default class Weather {
  constructor(weatherData, unit) {
    this.name = GetData(weatherData, 'name');

    this.unit = {};
    this.unit.abbr = GetData(unit, 'abbr');
    this.unit.label = GetData(unit, 'label');
    this.unit.value = GetData(unit, 'value');

    const weatherArray = GetData(weatherData, 'weather');
    var weather = weatherArray[0] != null ? weatherData.weather[0] : null;
    this.id = GetData(weather, 'id', '-');
    this.icon = GetData(weather, 'icon', '-');
    this.description = GetData(weather, 'description');

    var main = GetData(weatherData, 'main');
    this.temp = GetData(main, 'temp', '-', '°', 0);
    this.hi = GetData(main, 'temp_max', '-', '°', 0);
    this.lo = GetData(main, 'temp_min', '-', '°', 0);
    this.humidity = GetData(main, 'humidity', '-', '%', 0);
    this.feelsLike = GetData(main, 'feels_like', '-', '°', 0);
    this.pressure = GetData(main, 'pressure', '-', 'hPa', 0);

    var wind = GetData(weatherData, 'wind');
    this.speed = GetData(wind, 'speed', '-', ' mph', 0);

    var sys = GetData(weatherData, 'sys');
    this.sunrise = GetData(sys, 'sunrise');
    this.sunset = GetData(sys, 'sunset');
  }

  getIcon() {
    if (this.icon === '') {
      return '';
    }
    return `https://openweathermap.org/img/wn/${this.icon}@2x.png`;
  }

  getSunrise() {
    var date = new Date(this.sunrise * 1000);
    var timeStamp = (date.getHours() <= 12 ? date.getHours() : date.getHours() - 12).toString();
    timeStamp += `:${date.getMinutes().toString().padStart(2, 0)}`;
    timeStamp += date.getHours() <= 12 ? ' AM' : ' PM';
    return timeStamp;
  }

  getSunset() {
    var date = new Date(this.sunset * 1000);
    var timeStamp = (date.getHours() <= 12 ? date.getHours() : date.getHours() - 12).toString();
    timeStamp += `:${date.getMinutes().toString().padStart(2, 0)}`;
    timeStamp += date.getHours() <= 12 ? ' AM' : ' PM';
    return timeStamp;
  }
}

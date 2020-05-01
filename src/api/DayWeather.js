import { GetData } from './APIHelperFunctions';

export default class DayWeather {
  constructor(rawDay, index) {
    this.index = index;
    this._temp = GetData(rawDay, 'temp');

    this.lo = GetData(this._temp, 'min', '-', '°', 0);
    this.hi = GetData(this._temp, 'max', '-', '°', 0);

    this._weather = rawDay != null && rawDay.weather[0] != null ? rawDay.weather[0] : null;
    this.description = GetData(this._weather, 'description');
    this.icon = GetData(this._weather, 'icon');
  }
}

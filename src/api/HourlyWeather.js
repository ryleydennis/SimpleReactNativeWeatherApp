import { GetData } from './APIHelperFunctions';

export default class Weather {
  constructor(weatherData) {
    var list = GetData(weatherData, 'list');
    this.timeStamps = [];
    this.temps = [];

    if (Array.isArray(list)) {
      list.forEach((item) => {
        var dateTime = GetData(item, 'dt');
        var main = GetData(item, 'main');
        var temp = GetData(main, 'temp');
        if (dateTime != null && temp != null) {
          this.timeStamps.push(new Date(dateTime * 1000));
          this.temps.push(temp.toFixed(0));
        }
      });
    }
  }
}

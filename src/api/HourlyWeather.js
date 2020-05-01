export default class Weather {
  constructor(weatherData) {
    var list = this.getData(weatherData, 'list');
    this.timeStamps = [];
    this.temps = [];

    if (Array.isArray(list)) {
      list.forEach((item) => {
        var dateTime = this.getData(item, 'dt');
        var main = this.getData(item, 'main');
        var temp = this.getData(main, 'temp');
        if (dateTime != null && temp != null) {
          this.timeStamps.push(new Date(dateTime * 1000));
          this.temps.push(temp.toFixed(0));
        }
      });
    }
  }

  static getData(parent, child, placeHolder, decimalPlace, suffix) {
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

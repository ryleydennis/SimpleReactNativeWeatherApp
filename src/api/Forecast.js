const placeHolder = "-"

export default class Forecast {
    constructor(forecastData) {
        this.days = []

        for(let i = 0; i < this.days.length; i++) {
            this.days[i] = new DayWeather()
        }

        if (forecastData !== undefined) {
            var forecast = Array.isArray(forecastData) ? forecastData[0] : forecastData
            var unparsedDays = this.getData(forecast, 'list')
            if (Array.isArray(unparsedDays) && unparsedDays.length > 0) {
                for(let i = 0; i < unparsedDays.length; i++) {
                    this.days[i] = new DayWeather(unparsedDays[i], i)
                }
            }       
        }
    }

    getData(parent, child, suffix, decimalPlace) {
        var data = ""
    
        if (parent != null && parent[child] != null) {
            data = parent[child];
    
            if (decimalPlace != null) {
                data = data.toFixed(decimalPlace);
            }
        } else {
            data = placeHolder
        }
    
        if (suffix != null) {
            data = data + suffix;
        }
    
        return data
    }
}

export class DayWeather {
    constructor(rawDay, index) {
        this.index = index
        this._temp = this.getData(rawDay, 'temp')

        this.lo = this.getData(this._temp, 'min', '°', '-')
        this.hi = this.getData(this._temp, 'max', '°', '-')

        this._weather = rawDay != null && rawDay.weather[0] != null ? rawDay.weather[0] : null
        this.description = this.getData(this._weather, 'description')
        this.icon = this.getData(this._weather, 'icon')
    }

    getData(parent, child, suffix, decimalPlace) {
        var data = ""
    
        if (parent != null && parent[child] != null) {
            data = parent[child];
    
            if (decimalPlace != null) {
                data = data.toFixed(decimalPlace);
            }
        } else {
            data = placeHolder
        }
    
        if (suffix != null) {
            data = data + suffix;
        }
    
        return data
    }

    getIcon() {
        if (this.icon == '') {
            return ""
        }
        return "https://openweathermap.org/img/wn/" + this.icon + "@2x.png"
    }
}
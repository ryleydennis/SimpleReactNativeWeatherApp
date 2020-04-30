export default class Weather {
    constructor(weatherData, unit) {
        this.name = this.getData(weatherData, 'name')

        this.unit = {}
        this.unit.abbr = this.getData(unit, 'abbr')
        this.unit.label = this.getData(unit, 'label')
        this.unit.value = this.getData(unit, 'value')
        
        var weather = weatherData != null && weatherData.weather != null && weatherData.weather[0] != null ? weatherData.weather[0] : null
        this.id = this.getData(weather, 'id', '-' )
        this.icon = this.getData(weather, 'icon', '-')
        this.description = this.getData(weather, 'description')
        
        var main = this.getData(weatherData, 'main')
        this.temp = this.getData(main, 'temp', '-', 0, '°')
        this.hi = this.getData(main, 'temp_max', '-', 0, '°');
        this.lo = this.getData(main, 'temp_min', '-', 0, '°');
        this.humidity = this.getData(main, 'humidity', '-', 0, '%');
        this.feelsLike = this.getData(main, 'feels_like', '-', 0, '°');
        this.pressure = this.getData(main, 'pressure', '-', 0, ' hPa');

        var wind = this.getData(weatherData, 'wind')
        this.speed= this.getData(wind, 'speed', '-', 0, ' mph')

        var sys = this.getData(weatherData, 'sys')
        this.sunrise = this.getData(sys, 'sunrise')
        this.sunset = this.getData(sys, 'sunset')
    }

    getData(parent, child, placeHolder, decimalPlace, suffix) {
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

    getSunrise() {
        var date = new Date(this.sunrise * 1000)
        var timeStamp = (date.getHours() <= 12 ? date.getHours() : date.getHours() - 12).toString()
        timeStamp += ':' + (date.getMinutes()).toString().padStart(2, 0)
        timeStamp += date.getHours() <= 12 ? ' AM' : ' PM'
        return timeStamp
    }

    getSunset() {
        var date = new Date(this.sunset * 1000)
        var timeStamp = (date.getHours() <= 12 ? date.getHours() : date.getHours() - 12).toString()
        timeStamp += ':' + (date.getMinutes()).toString().padStart(2, 0)
        timeStamp += date.getHours() <= 12 ? ' AM' : ' PM'
        return timeStamp
    }

}
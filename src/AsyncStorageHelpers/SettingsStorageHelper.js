import { AsyncStorage } from 'react-native';

import timeZones from './TimeZones';

const unitKey = 'UNIT_KEY';
const timeZoneKey = 'TIMEZONE_KEY';
const availableUnits = [
    { value: 'Imperial', label: 'Fahrenheit' },
    { value: 'Metric', label: 'Celsius' },
    { value: 'Default', label: 'Kelvin' },
]

export default class SettingsHelper {

    getAvailableUnits() {
        return availableUnits;
    }

    async getSavedUnit() {
        try {
            const savedUnitJSON = await AsyncStorage.getItem(unitKey);
            if (savedUnitJSON !== null) {
                return JSON.parse(savedUnitJSON)
            } else {
                var defaultUnit = availableUnits[0]
                this.setSavedUnit(defaultUnit)
                    .then(() => {
                        return defaultUnit
                    })
            }
        } catch (error) {
            console.log(error)
        }
    }

    async setSavedUnit(unit) {
        try {
            await AsyncStorage.setItem(unitKey, JSON.stringify(unit))
        } catch (error) {
            return
            // Error saving data
        }
    }

    getTimeZones() {
        return timeones;
    }

    async getSavedTimeZone() {
        try {
            const savedTimeZoneJSON = await AsyncStorage.getItem(timeZoneKey);
            if (savedTimeZoneJSON !== null) {
                return JSON.parse(savedTimeZoneJSON)
            } else {
                var defaultZone = timeZones[75]
                this.setSavedTimeZone(defaultZone)
                    .then(() => {
                        return defaultZone
                    })
            }
        } catch (error) {
            console.log(error)
        }
    }

    async setSavedTimeZone(timeZone) {
        try {
            await AsyncStorage.setItem(timeZoneKey, JSON.stringify(timeZone))
        } catch (error) {
            return
            // Error saving data
        }
    }
}
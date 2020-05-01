/* eslint-disable consistent-return */
import { AsyncStorage } from 'react-native';

import { timeZoneLabels } from './TimeZones';

const unitKey = 'UNIT_KEY';
const timeZoneKey = 'TIMEZONE_KEY';
const filterTimeZoneKey = 'FILTER_TIME_ZONE_KEY';
const availableUnits = [
  { value: 'imperial', label: 'Fahrenheit', abbr: 'F' },
  { value: 'metric', label: 'Celsius', abbr: 'C' },
  { value: 'default', label: 'Kelvin', abbr: 'K' },
];

export default class SettingsHelper {
  static getAvailableUnits() {
    return availableUnits;
  }

  static async getSavedUnit() {
    try {
      const savedUnitJSON = await AsyncStorage.getItem(unitKey);
      if (savedUnitJSON !== null) {
        return JSON.parse(savedUnitJSON);
      }
      var defaultUnit = availableUnits[0];
      this.setSavedUnit(defaultUnit).then(() => defaultUnit);
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  static async setSavedUnit(unit) {
    try {
      await AsyncStorage.setItem(unitKey, JSON.stringify(unit));
    } catch (error) {
      // Error saving data
    }
  }

  static getTimeZones() {
    return timeZoneLabels;
  }

  static async getSavedTimeZone() {
    try {
      const savedTimeZoneJSON = await AsyncStorage.getItem(timeZoneKey);
      if (savedTimeZoneJSON !== null) {
        return JSON.parse(savedTimeZoneJSON);
      }
      var defaultZone = this.getTimeZones()[75];
      this.setSavedTimeZone(defaultZone).then(() => defaultZone);
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  static async setSavedTimeZone(timeZone) {
    try {
      await AsyncStorage.setItem(timeZoneKey, JSON.stringify(timeZone));
    } catch (error) {
      // Error saving data
    }
  }

  static async getTimeZoneFilter() {
    try {
      const filterTimeZones = await AsyncStorage.getItem(filterTimeZoneKey);
      if (filterTimeZones !== null) {
        return JSON.parse(filterTimeZones);
      }
      var defaultSetting = false;
      this.setTimeZoneFilter(defaultSetting).then(() => defaultSetting);
    } catch (error) {
      console.log(error);
    }
  }

  static async setTimeZoneFilter(isFiltered) {
    try {
      await AsyncStorage.setItem(filterTimeZoneKey, JSON.stringify(isFiltered));
    } catch (error) {
      // Error saving data
    }
  }
}

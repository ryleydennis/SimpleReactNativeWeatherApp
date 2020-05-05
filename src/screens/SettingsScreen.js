import React, { Component } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, TouchableWithoutFeedback, TextInput, Switch } from 'react-native-gesture-handler';

import SettingsHelper from '../AsyncStorageHelpers/SettingsStorageHelper';
import { TextStyle } from '../Styles';
import DropDown from '../DropDown';

export default class SettingsScreen extends Component {
  static switchFilterSetting(newValue) {
    SettingsHelper.setTimeZoneFilter(newValue).then((result) => {
      this.setState({
        filterEnabled: result,
      });
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      unit: {},
      timeZone: {},
      unitOptionsVisible: false,
      timeZoneOptionsVisible: false,
      unitLocation: { top: 0, left: 0 },
      timeZoneLocation: { top: 0, left: 0 },
      timeZoneSearch: '',
      filterEnabled: false,
    };
    this.updateUnitSelection = this.updateUnitSelection.bind(this);
    this.updateTimeZoneSelection = this.updateTimeZoneSelection.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.state;
    this._unsubscribe = navigation.addListener('focus', () => {
      SettingsHelper.getSavedUnit().then((storedUnit) => {
        this.setState({
          unit: storedUnit,
        });
      });
      SettingsHelper.getSavedTimeZone().then((storedTimeZone) => {
        this.setState({
          timeZone: storedTimeZone,
        });
      });
      SettingsHelper.getTimeZoneFilter().then((storedIsEnabled) => {
        this.setState({
          filterEnabled: storedIsEnabled,
        });
      });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getFilteredTimeZones() {
    const { timeZoneSearch } = this.state;
    return SettingsHelper.getTimeZones().filter((zone) => zone.label.includes(timeZoneSearch));
  }

  setupTimeZoneSearch() {
    const { timeZone } = this.state;
    this.setState({
      timeZoneOptionsVisible: true,
      unitOptionsVisible: false,
      timeZoneSearch: timeZone.label,
    });
  }

  updateUnitLocation(layout) {
    var top = layout.y + layout.height;
    this.setState({
      unitLocation: {
        left: layout.x,
        top,
      },
    });
  }

  updateTimeZoneLocation(layout) {
    var top = layout.y + layout.height;
    this.setState({
      timeZoneLocation: {
        left: layout.x,
        top,
      },
    });
  }

  hideDropDowns() {
    Keyboard.dismiss();
    this.setState({
      unitOptionsVisible: false,
      timeZoneOptionsVisible: false,
    });
  }

  updateUnitSelection(unit) {
    SettingsHelper.setSavedUnit(unit).then((storedUnit) => {
      this.setState({
        unit: storedUnit,
        unitOptionsVisible: false,
      });
    });
  }

  updateTimeZoneSelection(timezone) {
    SettingsHelper.setSavedTimeZone(timezone).then((storedZone) => {
      this.setState({
        timeZone: storedZone,
        timeZoneOptionsVisible: false,
      });
    });
  }

  render() {
    const { unit, unitOptionsVisible, unitLocation,
      timeZoneOptionsVisible, filterEnabled, timeZoneSearch,
      timeZone, timeZoneLocation } = this.state;
    return (
      <TouchableWithoutFeedback
        style={{ width: '100%', height: '100%' }}
        onPress={() => {
          this.hideDropDowns();
        }}
      >
        <LinearGradient style={styles.background} colors={['#FFFBF1', '#FFEDC0']}>
          <View style={styles.settings}>
            {/* TEMPERATURE UNIT */}
            <Text style={[TextStyle.medium, styles.settingLabel]}>Units</Text>
            <TouchableOpacity
              onPress={() => {
                var isVisible = !unitOptionsVisible;
                this.setState({ unitOptionsVisible: isVisible, timeZoneOptionsVisible: false });
              }}
            >
              <Text style={styles.settingOption}>{unit.label}</Text>
            </TouchableOpacity>
            <View
              onLayout={(event) => {
                this.updateUnitLocation(event.nativeEvent.layout);
              }}
              style={styles.underLine}
            />

            {/* TIME ZONE */}
            <Text style={[TextStyle.medium, styles.settingLabel]}>Time Zone</Text>
            <TextInput
              style={styles.settingOption}
              ref={(input) => {
                this.textInput = input;
              }}
              value={timeZoneOptionsVisible ? timeZoneSearch : timeZone.label}
              onChangeText={(search) => this.setState({ timeZoneSearch: search })}
              autoFocus={false}
              onFocus={() => this.setupTimeZoneSearch()}
              clearButtonMode="while-editing"
            />
            <View
              onLayout={(event) => {
                this.updateTimeZoneLocation(event.nativeEvent.layout);
              }}
              style={styles.underLine}
            />

            {/* TIME ZONE SWITCH */}
            <Text style={[TextStyle.mild, styles.settingLabel, { marginTop: 20 }]}>Filter search results by time zone</Text>
            <Switch
              style={{ marginTop: 25 }}
              value={filterEnabled}
              onValueChange={(newValue) => this.switchFilterSetting(newValue)}
            />

            {/* DROPDOWNS FOR BOTH TEMP AND TIMEZONE */}
            <DropDown
              visible={unitOptionsVisible}
              data={SettingsHelper.getAvailableUnits()}
              location={unitLocation}
              optionPressed={this.updateUnitSelection}
            />

            <DropDown
              visible={timeZoneOptionsVisible}
              data={this.getFilteredTimeZones()}
              location={timeZoneLocation}
              optionPressed={this.updateTimeZoneSelection}
            />
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    paddingTop: 30,
    paddingStart: 30,
    paddingEnd: 16,
    width: '100%',
    height: '100%',
  },
  settings: {
    justifyContent: 'flex-start',
  },
  settingLabel: {
    marginTop: 30,
    height: 20,
    color: 'gray',
  },
  settingOption: {
    marginTop: 6,
    width: '80%',
    height: 30,
    fontSize: 30,
    color: '#494949',
  },
  underLine: {
    marginTop: 6,
    height: 0.75,
    width: 300,
    backgroundColor: '#494949',
  },
});

import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';

import { fetchForecastData, fetchSummaryData, fetchHourlyData } from '../api/FetchWeatherAPI';
import SummaryCard from '../cards/SummaryCard';
import WeatherInfoCard from '../cards/WeatherInfoCard';
import WeatherForecastCard from '../cards/WeatherForecastCard';
import HourlyTempCard from '../cards/HourlyTempCard';
import SettingsHelper from '../AsyncStorageHelpers/SettingsStorageHelper';
import { setWeatherSummary, setWeatherForecast, setWeatherHourly, setUnit } from '../actions';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshingTodaysWeather: true,
      refreshingForecast: true,
      refreshingHourly: true,
    };

    this.fetchSummaryCallback = this.fetchSummaryCallback.bind(this);
    this.fetchHourlyCallback = this.fetchHourlyCallback.bind(this);
    this.fetchForecastCallback = this.fetchForecastCallback.bind(this);
    this.fetchWeatherData();
  }

  getLayout() {
    const { refreshingTodaysWeather, refreshingForecast, refreshingHourly } = this.state;
    if (refreshingTodaysWeather || refreshingForecast || refreshingHourly) {
      return [{ id: '1', layout: <View /> }];
    }
    return [
      { id: '1', layout: <SummaryCard style={styles.cardColumn} /> },
      { id: '2', layout: <WeatherInfoCard style={styles.cardColumn} /> },
      { id: '3', layout: <HourlyTempCard style={styles.cardColumn} /> },
      { id: '4', layout: <WeatherForecastCard style={styles.cardColumn} /> },
      { id: '5', layout: <View style={styles.listSpacer} /> },
    ];
  }

  fetchSummaryCallback(data) {
    const { _setWeatherSummary } = this.props;
    _setWeatherSummary(data);
    this.setState({
      refreshingTodaysWeather: false,
    });
  }

  fetchHourlyCallback(data) {
    const { _setWeatherHourly } = this.props;
    _setWeatherHourly(data);
    this.setState({
      refreshingHourly: false,
    });
  }

  fetchForecastCallback(data) {
    const { _setWeatherForecast } = this.props;
    _setWeatherForecast(data);
    this.setState({
      refreshingForecast: false,
    });
  }

  async fetchWeatherData() {
    const { unit, city, _setUnit } = this.props;
    // console.log(this.props)
    if (unit.value === undefined || unit.value === '') {
      var newUnit = await new SettingsHelper().getSavedUnit();
      _setUnit(newUnit);
    }

    if (city != null && unit !== undefined) {
      fetchSummaryData(city, unit, this.fetchSummaryCallback);
      fetchHourlyData(city, unit, this.fetchHourlyCallback);
      fetchForecastData(city, unit, this.fetchForecastCallback);
    } else {
      console.warn('No valid City or Unit for Homescreen');
    }
  }

  refreshScreen() {
    this.setState({
      refreshingTodaysWeather: true,
      refreshingForecast: true,
      refreshingHourly: true,
    });

    this.fetchWeatherData();
  }

  render() {
    const { refreshingTodaysWeather, refreshingForecast, refreshingHourly } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <LinearGradient colors={['#FFFBF1', '#FFEDC0']} style={{ flex: 1 }}>
          <View style={styles.listContainer}>
            <FlatList
              data={this.getLayout()}
              renderItem={({ item }) => item.layout}
              keyExtractor={(item) => item.id}
              refreshing={refreshingTodaysWeather || refreshingForecast || refreshingHourly}
              onRefresh={() => this.refreshScreen()}
              extraData={this.state}
            />
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  city: state.city,
  unit: state.unit,
});

const mapDispatchToProps = (dispatch) => ({
  setUnit: (unit) => dispatch(setUnit(unit)),
  _setWeatherSummary: (weather) => dispatch(setWeatherSummary(weather)),
  _setWeatherForecast: (forecast) => dispatch(setWeatherForecast(forecast)),
  _setWeatherHourly: (hourly) => dispatch(setWeatherHourly(hourly)),
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flex: 3,
  },
  listContainer: {
    marginTop: 6,
    marginStart: 20,
    marginEnd: 20,
    flexDirection: 'row',
    flex: 1,
  },
  bottomGradient: {
    height: 100,
    flexGrow: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  listSpacer: {
    height: 100,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

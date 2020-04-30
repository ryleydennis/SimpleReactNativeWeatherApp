import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, FlatList, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux'

import {fetchForecastData, fetchSummaryData, fetchHourlyData} from '../api/FetchWeatherAPI';
import SampleWeatherAPI from '../api/SampleWeatherAPI';
import SummaryCard from '../cards/SummaryCard.js';
import WeatherInfoCard from '../cards/WeatherInfoCard.js';
import WeatherForecastCard from '../cards/WeatherForecastCard'
import HourlyTempCard from '../cards/HourlyTempCard.js';
import SettingsHelper from '../AsyncStorageHelpers/SettingsStorageHelper';
import { setWeatherSummary, setWeatherForecast, setWeatherHourly, setUnit } from '../actions'

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshingTodaysWeather: false,
      refreshingForecast: false,
      refreshingHourly: false,
      city: props.route.params.city,
      unit: '',
    };

    this.refreshScreen()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={['#FFFBF1', '#FFEDC0']}
          style={{ flex: 1 }}>
          <View style={styles.listContainer}>
            <FlatList
              data={this.getLayout()}
              renderItem={({ item }) => (
                item.layout
              )}
              keyExtractor={item => item.id}
              refreshing={this.state.refreshingTodaysWeather || this.state.refreshingForecast || this.state.refreshingHourly}
              onRefresh={() => this.refreshScreen()}
              extraData={this.state}
            />
          </View>
        </LinearGradient>
      </View>
    );
  }

  refreshScreen() {
    this.setState({
      refreshingTodaysWeather: true,
      refreshingForecast: true,
      refreshingHourly: true,
    });

      this.fetchWeatherData()
  }

  async fetchWeatherData() {
    if (this.props.unit.label === undefined) {
      var unit = await new SettingsHelper().getSavedUnit()
      this.props.setUnit(unit)
    } 
    if (this.state.city != null) {
      fetchSummaryData(this.props.city, this.props.unit, this.props.setWeatherSummary)
      // fetchForecastData(this.props.city, this.props.units, this.props.setWeatherForecast)
      // fetchHourlyData(this.props.city, this.props.unit, this.props.setWeatherHourly)
    }
  }

  getLayout() {
    if (this.state.refreshingTodaysWeather || this.state.refreshingForecast || this.state.refreshingHourly) {
      return [
        { id: '1', layout: <View /> },
      ]
    } else {
      return [
        { id: '1', layout: <SummaryCard style={styles.cardColumn}/> },
        // { id: '2', layout: <WeatherInfoCard style={styles.cardColumn} weatherData={this.props.weatherSummary} /> },
        // { id: '3', layout: <HourlyTempCard style={styles.cardColumn} hourlyData={this.props.weatherHourly} /> },
        // { id: '4', layout: <WeatherForecastCard style={styles.cardColumn} forecastData={this.props.weatherForecast} /> },
        // { id: '5', layout: <View style={styles.listSpacer} /> }
      ]
    }
  }

  fetchWeatherCallback(success, context, data) {
    if (success === true) {
      //GeoLocation API and OpenWeather don't always agree on the name of coordinates, use GeoLocation name for clarity
      data.name = context.state.city.name
      context.setState({
        refreshingTodaysWeather: false,
        weatherData: data
      });
      context.state.setSummary(data)
    } else {
      context.setState({
        refreshingTodaysWeather: false,
      });
    }
  }

  fetchForecastCallback(success, context, data) {
    if (success === true) {
      context.setState({
        refreshingForecast: false,
        forecastData: data
      });
    } else {
      context.setState({
        refreshingForecast: false,
      });
    }
  }

  fetchHourlyCallback(success, context, data) {
    if (success === true) {
      context.setState({
        refreshingHourly: false,
        hourlyData: data
      });
    } else {
      context.setState({
        refreshingHourly: false,
      });
    }
  }
}

const mapStateToProps = state => ({
  city: state.city,
  unit: state.unit
})

const mapDispatchToProps = dispatch => ({
  setUnit: unit => dispatch(setUnit(unit)),
  setWeatherSummary: weather => dispatch(setWeatherSummary(weather)),
  setWeatherForecast: forecast => dispatch(setWeatherForecast(forecast)),
  setWeatherHourly: hourly => dispatch(setWeatherHourly(hourly))
})

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
    left: 0, right: 0,
    bottom: 0,
  },
  listSpacer: {
    height: 100
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, FlatList, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux'

import WeatherAPI from '../api/WeatherAPI';
import SummaryCard from '../cards/SummaryCard.js';
import WeatherInfoCard from '../cards/WeatherInfoCard.js';
import WeatherForecastCard from '../cards/WeatherForecastCard'
import HourlyTempCard from '../cards/HourlyTempCard.js';
import Forecast from '../api/Forecast';
import Weather from '../api/Weather';
import HourlyWeather from '../api/HourlyWeather';
import SettingsHelper from '../AsyncStorageHelpers/SettingsStorageHelper';
import { setWeatherSummary } from '../actions';

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherData: new Weather(),
      forecastData: new Forecast(),
      hourlyData: new HourlyWeather(),
      refreshingTodaysWeather: true,
      refreshingForecast: true,
      refreshingHourly: true,
      city: props.route.params.city,
      unit: '',
    };
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
    if (this.state.unit == '') {
      var unit = await new SettingsHelper().getSavedUnit()
      this.setState({unit: unit})
    } 
    if (this.state.city != null) {
      WeatherAPI.fetchWeatherData(this.state.city, this, this.fetchWeatherCallback, this.state.unit);
      WeatherAPI.fetchWeatherForecast(this.state.city, this, this.fetchForecastCallback, this.state.unit);
      WeatherAPI.fetchHourlyForecast(this.state.city, this, this.fetchHourlyCallback, this.state.unit);
    }
  }

  getLayout() {
    if (this.state.refreshingTodaysWeather || this.state.refreshingForecast || this.state.refreshingHourly) {
      return [
        { id: '1', layout: <View /> },
      ]
    } else {
      return [
        { id: '1', layout: <SummaryCard style={styles.cardColumn} weatherData={this.state.weatherData} city={this.state.city}/> },
        { id: '2', layout: <WeatherInfoCard style={styles.cardColumn} weatherData={this.state.weatherData} /> },
        { id: '3', layout: <HourlyTempCard style={styles.cardColumn} hourlyData={this.state.hourlyData} /> },
        { id: '4', layout: <WeatherForecastCard style={styles.cardColumn} forecastData={this.state.forecastData} /> },
        { id: '5', layout: <View style={styles.listSpacer} /> }
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
      setWeatherSummary(data)
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
  weatherSummary: state.weatherSummary
})

const mapDispatchToProps = dispatch => ({
  setWeatherSummary: weatherSummary => dispatch(setWeatherSummary(weatherSummary))
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

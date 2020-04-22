import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, FlatList, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import WeatherAPI from '../api/WeatherAPI';
import SummaryCard from '../cards/SummaryCard.js';
import WeatherInfoCard from '../cards/WeatherInfoCard.js';
import WeatherForecastCard from '../cards/WeatherForecastCard'
import HourlyTempCard from '../cards/HourlyTempCard.js';
import Forecast from '../api/Forecast';
import Weather from '../api/Weather';
import HourlyWeather from '../api/HourlyWeather';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    console.log(props.route.params.city)
    this.state = {
      weatherData: new Weather(),
      forecastData: new Forecast(),
      hourlyData: new HourlyWeather(),
      refreshingTodaysWeather: true,
      refreshingForecast: true,
      refreshingHourly: true,
      city: props.route.params.city,
    };

    this.fetchWeatherData()
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

  fetchWeatherData() {
    if(this.state.city != null) {
      WeatherAPI.fetchWeatherData(this.state.city, this, this.fetchWeatherCallback);
      WeatherAPI.fetchWeatherForecast(this.state.city, this, this.fetchForecastCallback);
      WeatherAPI.fetchHourlyForecast(this.state.city, this, this.fetchHourlyCallback);
    }
  }

  getLayout() {
    if (this.state.refreshingTodaysWeather || this.state.refreshingForecast || this.state.refreshingHourly) {
      return [
        { id: '1', layout: <View /> },
      ]
    } else {
      return [
        { id: '1', layout: <SummaryCard style={styles.cardColumn} weatherData={this.state.weatherData} /> },
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flex: 3,
  },
  listContainer: {
    marginTop: 40,
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

import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { GetIcon } from '../api/APIHelperFunctions';
import Forecast from '../api/Forecast';
import { ViewStyle, TextStyle } from '../Styles';

const WeatherForecastCard = (props) => {
  const { forecast } = props;
  if (forecast.days !== undefined && forecast.days.length !== 0) {
    return (
      <View style={ViewStyle.card}>
        <View style={styles.card}>
          <FlatList
            style={styles.list}
            data={forecast.days}
            renderItem={({ item }) => <DaySummary dayWeather={item} />}
            keyExtractor={(item) => item.index.toString()}
            horizontal
          />
        </View>
      </View>
    );
  }
  return <View />;
};

WeatherForecastCard.propTypes = {
  forecast: PropTypes.instanceOf(Forecast).isRequired,
};

const DaySummary = (props) => {
  const { dayWeather } = props;
  return (
    <View style={styles.daySummaryView}>
      <Text style={TextStyle.mild}>{getDate(dayWeather.index)}</Text>
      <Image style={styles.daySummaryImage} source={{ uri: GetIcon(dayWeather.icon) }} />
      <Text style={TextStyle.mild}>{dayWeather.hi}</Text>
      <Text style={TextStyle.mild}>{dayWeather.lo}</Text>
    </View>
  );
};

const getDate = (index) => {
  const day = parseInt(new Date().getDay(), 10) + parseInt(index, 10);
  const correctedDay = day < 7 ? day : day - 7;
  // console.log('index ' + index + ' |added: ' + day + ' |adjusted: ' + correctedDay)

  switch (correctedDay) {
    case 0:
      return 'Su';
    case 1:
      return 'M';
    case 2:
      return 'Tu';
    case 3:
      return 'W';
    case 4:
      return 'Th';
    case 5:
      return 'F';
    case 6:
      return 'Sa';
    default:
      return '';
  }
};

const mapStateToProps = (state) => ({
  forecast: state.weatherForecast,
});

const styles = StyleSheet.create({
  forecastCard: {
    marginBottom: 16,
    marginStart: 4,
    marginEnd: 4,
    flexDirection: 'column',
  },
  rowText: {
    fontSize: 20,
    color: 'slategray',
  },
  daySummaryView: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  daySummaryImage: {
    width: 60,
    height: 60,
  },
  list: {
    margin: 10,
  },
});

export default connect(mapStateToProps)(WeatherForecastCard);

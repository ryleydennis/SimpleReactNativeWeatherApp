import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

import { ViewStyle, TextStyle } from '../Styles';

const WeatherInfoCard = ({ weather }) => (
  <View style={ViewStyle.card}>
    <View style={styles.infoCard}>
      <Row left="humidity" right={weather.humidity} />
      <Row left="pressure" right={weather.pressure} backgroundColor="#EAEAEA" />
      <Row left="wind speed" right={weather.speed} />
      <Row left="sunrise" right={weather.getSunrise()} backgroundColor="#EAEAEA" />
      <Row left="sunset" right={weather.getSunset()} />
    </View>
  </View>
);

const mapStateToProps = (state) => ({
  weather: state.weatherSummary,
});

const Row = (props) => {
  const { left, right, backgroundColor } = props;
  return (
    <View backgroundColor={backgroundColor} style={{ borderRadius: 5, padding: 5 }}>
      <View style={styles.rowView}>
        <Text style={TextStyle.medium}>{left}</Text>
        <Text style={TextStyle.medium}>{right}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    margin: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowSeparator: {
    backgroundColor: '#494949',
    height: 0.75,
    flexGrow: 1,
    marginStart: 8,
    marginEnd: 8,
    alignSelf: 'center',
  },
});

export default connect(mapStateToProps)(WeatherInfoCard);

/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import { ViewStyle, TextStyle } from '../Styles';

import FavoritesHelper from '../AsyncStorageHelpers/FavoritesStorageHelper';

const favoritesHelper = new FavoritesHelper();

const SummaryCard = ({ weather, city }) => {
  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    favoritesHelper.checkIfFavorite(city).then((result) => {
      setFavorite(result);
    });
  });

  return (
    <View style={ViewStyle.card}>
      <View style={styles.summaryCard}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[TextStyle.title, { flexGrow: 1 }]}>{weather.name}</Text>
          <TouchableOpacity
            style={{ margin: 6 }}
            onPress={() => {
              favoritesHelper.setFavorites(!isFavorite, city, (favoriteResult) => {
                setFavorite(favoriteResult);
              });
            }}
          >
            <Icon name={isFavorite ? 'star' : 'star-o'} color={isFavorite ? 'gold' : '#494949'} size={25} />
          </TouchableOpacity>
        </View>
        <Text style={TextStyle.mild}>{getTimeStamp()}</Text>
        <View style={{ width: '70%', height: 0.75, backgroundColor: '#494949', marginTop: 3 }} />
        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
          <View>
            <Text style={TextStyle.large}>{weather.temp + weather.unit.abbr}</Text>
            <Text style={TextStyle.mild}>{`feels like ${weather.feelsLike}`}</Text>
            <Text style={TextStyle.medium}>{`${weather.hi}↑ · ${weather.lo}↓`}</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image style={styles.image} source={{ uri: weather.getIcon() }} />
            <Text style={TextStyle.mild}>{weather.description}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  weather: state.weatherSummary,
  city: state.city,
});

const styles = StyleSheet.create({
  summaryCard: {
    paddingTop: 10,
    paddingStart: 16,
    paddingBottom: 10,
    marginTop: 10,
    marginStart: 4,
    marginEnd: 4,
    marginBottom: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderColor: 'lightgray',
  },
  image: {
    width: 100,
    height: 100,
    marginStart: 16,
    marginRight: 16,
  },
  titleText: {
    fontSize: 30,
    color: '#494949',
  },
  TextStyle: {
    fontSize: 16,
    color: '#494949',
  },
  largeText: {
    fontSize: 60,
    color: '#494949',
  },
  infoRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowSeparator: {
    backgroundColor: 'slategray',
    height: 0.75,
    flexGrow: 1,
    marginStart: 8,
    marginEnd: 8,
    alignSelf: 'center',
  },
});

const getTimeStamp = () => {
  var date = new Date();

  var dateStamp = `${date.getMonth() + 1}/${date.getDate()}`;

  var timeStamp = (date.getHours() <= 12 ? date.getHours() : date.getHours() - 12).toString();
  timeStamp += `:${date.getMinutes().toString().padStart(2, 0)}`;
  timeStamp += date.getHours() <= 12 ? ' AM' : ' PM';

  return `${dateStamp} ${timeStamp}`;
};

export default connect(mapStateToProps)(SummaryCard);

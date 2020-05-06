/* eslint-disable class-methods-use-this */
import { AsyncStorage } from 'react-native';

const favoritesKey = 'FAVORITES_KEY';

export default class FavoritesHelper {
  // Uncomment below to reset async storage
  // constructor() {
  //   AsyncStorage.clear();
  // }

  async getFavorites() {
    try {
      const favoritesJSON = await AsyncStorage.getItem(favoritesKey);
      if (favoritesJSON !== null) {
        // console.log(JSON.parse(favoritesJSON));
        return JSON.parse(favoritesJSON);
      }
      return [];
    } catch (error) {
      console.warn(error);
      return [];
    }
  }

  async checkIfFavorite(city) {
    try {
      const favoritesJSON = await AsyncStorage.getItem(favoritesKey);
      if (favoritesJSON !== null) {
        var favorites = JSON.parse(favoritesJSON);
        return this.checkFavoritesForCity(favorites, city);
      }
      return false;
    } catch (error) {
      console.warn(error);
      return false;
    }
  }

  setFavorites(isFavorite, city, callback) {
    AsyncStorage.getItem(favoritesKey).then((favoritesJSON) => {
      var favorites = JSON.parse(favoritesJSON);
      // console.log(favorites);
      // favorites should default to an empty array
      if (favorites === null) {
        favorites = [];
      }

      favorites = isFavorite
        ? this.addToFavorites(city, favorites)
        : this.removeFromFavorites(city, favorites);
      this.saveFavorites(favorites).then(() => {
        callback(isFavorite);
      });
    });
  }

  addToFavorites(city, favorites) {
    if (!this.checkFavoritesForCity(favorites, city)) {
      favorites.push(city);
    }
    return favorites;
  }

  removeFromFavorites(city, favorites) {
    if (this.checkFavoritesForCity(favorites, city)) {
      return favorites.filter((favoriteCity) => favoriteCity.name !== city.name);
    }
    return favorites;
  }

  async saveFavorites(favorites) {
    try {
      await AsyncStorage.setItem(favoritesKey, JSON.stringify(favorites));
    } catch (error) {
      console.warn('UH OH');
      // Error saving data
    }
  }

  checkFavoritesForCity(favorites, city) {
    if (favorites.length === 0) return false;
    if (favorites !== undefined && favorites.length !== 0) {
      // eslint-disable-next-line consistent-return
      for (var i = 0; i < favorites.length; i += 1) {
        if (favorites[i].name === city.name) {
          return true;
        }
      }
    }
    return false;
  }
}

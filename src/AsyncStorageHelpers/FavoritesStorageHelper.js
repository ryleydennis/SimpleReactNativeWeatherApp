import { AsyncStorage } from 'react-native';

const favoritesKey = 'FAVORITES_KEY';

export default class FavoritesHelper {
  static async getFavorites() {
    try {
      const favoritesJSON = await AsyncStorage.getItem(favoritesKey);
      if (favoritesJSON !== null) {
        return JSON.parse(favoritesJSON);
      }
      return [];
    } catch (error) {
      console.warn(error);
      return [];
    }
  }

  static async checkIfFavorite(city) {
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
      // favorites should always be an empty array
      if (favorites === null) {
        favorites = [];
      }

      favorites = isFavorite ? this.addToFavorites(city, favorites) : this.removeFromFavorites(city, favorites);
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

  static async saveFavorites(favorites) {
    try {
      await AsyncStorage.setItem(favoritesKey, JSON.stringify(favorites));
    } catch (error) {
      // Error saving data
    }
  }

  static checkFavoritesForCity(favorites, city) {
    if (favorites !== undefined && favorites.length !== 0) {
      // eslint-disable-next-line consistent-return
      favorites.forEach((favorite) => {
        if (favorite.name === city.name) {
          return true;
        }
      });
    }
    return false;
  }

  // async getFavorites() {
  //     try {
  //         const value = await AsyncStorage.getItem(favoritesKey);
  //         if (value !== null) {
  //             return value
  //         } else {
  //             return []
  //         }
  //     } catch (error) {
  //         // Error retrieving data
  //     }
  // }

  // async setIsFavorite(isFavorite) {
  //     var favorites = await this.getFavorites();
  //     var isCurrentFavorite = favorites.includes(this.state.city)

  //     //If city has been set to favorite and is not currently a favorite, add to favorites
  //     if (isFavorite && !isCurrentFavorite) {
  //         favorites.push(this.state.city)
  //         try {
  //             await AsyncStorage.setItem(favoritesKey, favorites);
  //             this.setState({
  //                 isFavorite: true
  //             })
  //         } catch (error) {
  //             // Error saving data
  //         }
  //     }
  //     //If city has been set to not-favorite and is currently a favorite, remove from favorites
  //     else if (!isFavorite && isCurrentFavorite) {
  //         favorites = favorites.filter(city => city.name != this.state.city.name)
  //         try {
  //             await AsyncStorage.setItem(favoritesKey, favorites);
  //             this.setState({
  //                 isFavorite: false
  //             })
  //         } catch (error) {
  //             // Error saving data
  //         }
  //     }

  // }
}

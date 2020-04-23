
import { AsyncStorage } from 'react-native';
const favoritesKey = 'FAVORITES_KEY'

export default class FavoritesHelper {

    async getFavorites() {
        try {
            const favoritesJSON = await AsyncStorage.getItem(favoritesKey);
            if (favoritesJSON !== null) {
                return JSON.parse(favoritesJSON);
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    async checkIfFavorite(city) {
        try {
            const favoritesJSON = await AsyncStorage.getItem(favoritesKey);
            if (favoritesJSON !== null) {
                var favorites = JSON.parse(favoritesJSON)
                return this.checkFavoritesForCity(favorites, city);
            }
        } catch (error) {
            console.log(error)
        }
    }

    setFavorites(isFavorite, city, context, callback) {
        AsyncStorage.getItem(favoritesKey)
            .then(favoritesJSON => {
                var favorites = JSON.parse(favoritesJSON)
                // favorites should always be an empty array
                if (favorites === null) {
                    favorites = []
                }

                favorites = (isFavorite ? this.addToFavorites(city, favorites) : this.removeFromFavorites(city, favorites))
                this.saveFavorites(favorites)
                    .then(() => {
                        callback(context, isFavorite)
                    })
            })
    }

    addToFavorites(city, favorites) {
        if (!this.checkFavoritesForCity(favorites, city)) {
            favorites.push(city)
        }
        return favorites;
    }

    removeFromFavorites(city, favorites) {
        if (this.checkFavoritesForCity(favorites, city)) {
            favorites = favorites.filter(favoriteCity => favoriteCity.name != city.name)
        }
        return favorites
    }

    async saveFavorites(favorites) {
        try {
            await AsyncStorage.setItem(favoritesKey, JSON.stringify(favorites))
        } catch (error) {
            return
            // Error saving data
        }
    }

    checkFavoritesForCity(favorites, city) {
        for (favorite of favorites) {
            if (favorite.name == city.name) {
                return true
            }
        }
        return false
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
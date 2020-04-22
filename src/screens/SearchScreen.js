import React, { Component, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather'
import Styles, { ViewStyle, TextStyle } from '../Styles'
import CitySearchAPI from '../api/CityAPI'

export default function SearchScreen({ navigation }) {
    const [cities, setCities] = useState([
        {name: 'Ann Arbor', lat: 42.279999, lon: -83.790001},
        {name: 'New York', lat: 40.750000, lon: -74.000000},
        {name: 'Antonio'}
    ]);

    return (
        <LinearGradient
            style={styles.background}
            colors={['#FFFBF1', '#FFEDC0']}
        >
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    placeholder='New York'
                    onChangeText={(text) =>  CitySearchAPI.searchCities(text, setCities)}
                />
                <View style={styles.underLine} />
            </View>
            <FlatList
                style={styles.searchList}
                data={cities}
                keyExtractor={city => city.name}
                renderItem={(item) => (
                    cityCard(item.item, navigation)
                )}
            />
        </LinearGradient>
    )
}

function cityCard(city, navigation) {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
                navigation.navigate('Home', {
                    city: city
                })
            }}
        >
            <View style={[ViewStyle.card, { marginTop: 6 }]}>
                <Icon
                    name="chevron-right"
                    color='#494949'
                    size={25}
                    style={cityCardStyles.chevron}
                />
                <View style={cityCardStyles.cityName}>
                    <Text style={TextStyle.medium}>{city.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

}

const cityCardStyles = StyleSheet.create({
    cityName: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 10,
    },
    chevron: {
        position: 'absolute',
        right: 10,
        top: '22%',
    }
})

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,
        paddingStart: 16,
        paddingEnd: 16,
    },
    input: {
        textAlign: 'center',
        alignSelf: 'center',
        height: 30,
        width: 230,
        borderRadius: 10,
        fontSize: 20,
        color: '#494949'
    },
    underLine: {
        height: 0.75,
        width: 250,
        backgroundColor: '#494949',
    },
    leftSpacer: {
        height: 30,
        width: 30,
    },
    inputBox: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginTop: 16,

    },
    searchList: {
        marginTop: 16,
        marginBottom: 80,
        flexGrow: 1,
        width: '100%',
    }
})
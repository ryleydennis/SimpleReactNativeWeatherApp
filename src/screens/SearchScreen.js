import React, { Component, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather'
import Styles, { ViewStyle, TextStyle } from '../Styles'
import CitySearchAPI from '../api/CitySearchAPI'

export default class SearchScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            cities: [],
            inputIsValid: true,
            lastAPICall: 0,
            navigation: props.navigation
        }
    }

    render() {
        return (
            <LinearGradient
                style={styles.background}
                colors={['#FFFBF1', '#FFEDC0']}
            >
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder='e.g. New York'
                        onChangeText={(input) => this.searchCityInput(input)}
                    />
                    <View style={styles.underLine} />
                    <Text style={styles.errorMessage}>{this.state.inputIsValid ? '' : '*Please only use letters, spaces, and commas'}</Text>
                </View>
                <FlatList
                    style={styles.searchList}
                    data={this.state.cities}
                    keyExtractor={city => city.name}
                    renderItem={(item) => (
                        this.cityCard(item.item)
                    )}
                />
            </LinearGradient>
        )
    }

    searchCityInput(input) {

        if (input == '') {
            this.setState({ inputIsValid: true, cities: [] });
        } else if (/^[a-zA-Z\s,]*$/.test(input)) {
            this.setState({ inputIsValid: true });
            CitySearchAPI.searchCities(input, this, this.searchCityCallback)
        } else {
            this.setState({ inputIsValid: false, cities: [] });
        }
    }

    searchCityCallback(context, data, timeStamp) {
        if (context.state.lastAPICall < timeStamp) {
            context.setState({
                cities: data,
                lastAPICall: timeStamp
            });
        }
    }
    
    
    cityCard(city) {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    this.state.navigation.navigate('Weather', {
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
        marginBottom: 16,
    },
    errorMessage: {
        color: 'red',
        position: 'absolute',
        bottom: 0,
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
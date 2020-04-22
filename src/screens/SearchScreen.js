import React, { Component, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather'
import Styles, { ViewStyle, TextStyle } from '../Styles'
import CitySearchAPI from '../api/CitySearchAPI'

export default class SearchScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cities: [],
            inputIsValid: true,
            lastAPICall: 0,
            navigation: props.navigation,
            shadowHeight: 0,
        }
    }

    render() {
        return (
            <LinearGradient
                style={styles.background}
                colors={['#FFFBF1', '#FFEDC0']}
            >
                <View style={styles.inputBox}>
                    <Text style={styles.errorMessage}>{this.state.inputIsValid ? '' : '*Please only use letters, spaces, and commas'}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='e.g. New York'
                        onChangeText={(input) => this.searchCityInput(input)}
                    />
                    <View style={styles.underLine} />
                </View>
                <FlatList
                    style={styles.searchList}
                    data={this.state.cities}
                    keyExtractor={city => city.name}
                    renderItem={(item) => (
                        this.cityCard(item.item)
                    )}
                    onScroll={(event) => {
                        this.updateShadowHeight(event.nativeEvent.contentOffset.y);
                    }}
                />
                <LinearGradient
                    style={[styles.listGradient, { height: this.state.shadowHeight }]}
                    colors={['#494949', 'rgba(73, 73, 73, 0)']}
                >
                </LinearGradient>
            </LinearGradient>
        )
    }

    updateShadowHeight(offset) {
        if (this.state.cities.length == 0) {
            this.setState({ shadowHeight: 0 })
        } else {
            //Decreasing the rate in which the shadow grows to make it a little less intrusive looking
            var calculatedOffset = offset * 0.3
            const maxHeight = 50
            var height = calculatedOffset <= maxHeight ? calculatedOffset : maxHeight;
            this.setState({ shadowHeight: height })
        }
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
        paddingTop: 30,
        paddingStart: 16,
        paddingEnd: 16,
    },
    listGradient: {
        flex: 1,
        width: '100%',
        position: 'absolute',
        top: 102.75,
        opacity: 0.2,
    },
    input: {
        marginTop: 16,
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
        width: '100%',
        backgroundColor: '#494949',
    },
    errorMessage: {
        color: 'red',
        position: 'absolute',
        top: 0,
    },
    leftSpacer: {
        height: 30,
        width: 30,
    },
    inputBox: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        marginTop: 16,
    },
    searchList: {
        flexGrow: 1,
        width: '100%',
    }
})
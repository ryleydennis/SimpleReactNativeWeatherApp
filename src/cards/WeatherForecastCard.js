import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ViewStyle, TextStyle} from '../Styles'

export default class WeatherForecastCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            forecastData: props.forecastData
        }
    }

    render() {
        var forecast = this.state.forecastData
        return (
            <View style={ViewStyle.card}>
                <View style={styles.card}>
                    <FlatList
                        style={styles.list}
                        data={this.state.forecastData.days}
                        renderItem={({ item }) => (
                            <DaySummary dayWeather={item} />
                        )}
                        keyExtractor={item => item.index.toString()}
                        horizontal
                    />
                </View>
            </View>
        )
    }
}

class DaySummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dayWeather: props.dayWeather
        };
    }
    render() {
        return (
            <View style={styles.daySummaryView}>
                <Text style={TextStyle.mild}>{this.getDate(this.state.dayWeather.index)}</Text>
                <Image style={styles.daySummaryImage} source={{ uri: this.state.dayWeather.getIcon() }} />
                <Text style={TextStyle.mild}>{this.state.dayWeather.hi}</Text>
                <Text style={TextStyle.mild}>{this.state.dayWeather.lo}</Text>
            </View>
        )
    }

    getDate(index) {
        var day = parseInt(new Date().getDay()) + parseInt(index)
        var correctedDay = day < 7 ? day : day - 7
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
        }
    }
}

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
        margin: 10
    }
});
import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import LineChart from "react-native-responsive-linechart";
import { ViewStyle } from '../Styles';

export default class HourlyTempCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hourlyData: props.hourlyData
        };
    };


    render() {
        var hourlyData = this.state.hourlyData;
        return (
            <View style={ViewStyle.card}>
                <View style={styles.hourlyCard}>
                    <LineChart 
                        style={{ flex: 1, margin: 10, }} 
                        config={config} 
                        data={hourlyData.temps.slice(0,8)} 
                        xLabels={this.getTimeLables(hourlyData.timeStamps)} />
                </View>
            </View>

        )
    }

    

    getTimeLables(timeStamps) {
        var previousDay = timeStamps[0].getDay()
        var times = [];
        for (var timeStamp of timeStamps) {
            var time = (timeStamp.getHours() <= 12 ? timeStamp.getHours() : timeStamp.getHours() - 12).toString()
            time += timeStamp.getHours() <= 12 ? 'A' : 'P'

            if (previousDay != timeStamp.getDay()) {
                previousDay = timeStamp.getDay()
                time += (' (' + this.getDayText(timeStamp.getDay()) + ')')
            }

            times.push(time)
        }
        return times;
    }

    getDayText(day) {
        var correctedDay = day < 7 ? day : day - 7

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
const config = {
    line: {
        visible: true,
        strokeWidth: 1,
        strokeColor: "#e0d44f"
    },
    area: {
        visible: true,
        gradientFrom: "#e0d44f",
        gradientFromOpacity: 0.6,
        gradientTo: "#fffcde",
        gradientToOpacity: 0
    },
    yAxis: {
        visible: false,
    },
    xAxis: {
        visible: true,
        labelColor: '#494949',
        labelFontSize: 14,
    },
    grid: {

        visible: true,
        stepSize: 10
    },
    insetY: 10,
    insetX: 20,
    dataPoint: {
        visible: true,
        color: "#777",
        radius: 3,
        label: {
            visible: true,
            labelFontSize: 14,
            labelColor: "#494949",
            labelFormatter: v => String(v) + '°',
            marginBottom: 25
        }
    },
};

const styles = StyleSheet.create({
    hourlyCard: {
        marginBottom: 16,
        marginStart: 4,
        marginEnd: 4,
        height: 200,
        flexDirection: 'column',
        alignContent: 'center',
    },

})

import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ViewStyle, TextStyle } from '../Styles';

import SettingsHelper from '../AsyncStorageHelpers/SettingsStorageHelper';
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';


const settingsHelper = new SettingsHelper()


export default class SettingsScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navigation: props.navigation,
            unit: {},
            timeZone: {},
            unitOptionsVisible: 'false',
            unitLocation: { top: 0, left: 0 }
        }
    }

    componentDidMount() {
        this._unsubscribe = this.state.navigation.addListener('focus', () => {
            settingsHelper.getSavedUnit()
                .then(storedUnit => {
                    this.setState({
                        unit: storedUnit,
                    })
                })
            settingsHelper.getSavedTimeZone()
                .then(storedTimeZone => {
                    this.setState({
                        timeZone: storedTimeZone,
                    })
                })
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    render() {
        return (
            <TouchableWithoutFeedback
                style={{ width: '100%', height: '100%' }}
                onPress={() => this.hideDropDowns()}
            >
                <LinearGradient
                    style={styles.background}
                    colors={['#FFFBF1', '#FFEDC0']}
                >
                    <View style={styles.settings} >
                        <Text style={[TextStyle.medium, styles.settingLabel]}>Units</Text>
                        <TouchableOpacity
                            onPress={() => { this.setState({ unitOptionsVisible: !this.state.unitOptionsVisible }) }}
                        >
                            <Text style={styles.settingOption}>{this.state.unit.label}</Text>
                        </TouchableOpacity>
                        <View
                            onLayout={event => { this.updateLocation(event.nativeEvent.layout) }}
                            style={styles.underLine}
                        />

                        <Text style={[TextStyle.medium, styles.settingLabel]}>TimeZone</Text>
                        <TouchableOpacity >
                            <Text style={styles.settingOption}>{this.state.timeZone.abbr}</Text>
                        </TouchableOpacity>
                        <View style={styles.underLine} />

                        <FlatList
                            data={this.state.unitOptionsVisible ? [] : settingsHelper.getAvailableUnits()}
                            renderItem={({ item }) => listItem(item, this)}
                            keyExtractor={item => item.label}
                            style={{ position: 'absolute', left: this.state.unitLocation.left, top: this.state.unitLocation.top }}
                        />

                    </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
        )
    }


    updateLocation(layout) {
        var top = layout.y + layout.height * 2
        this.setState({
            unitLocation: {
                left: layout.x,
                top: top
            }
        })
        console.log({
            left: layout.x,
            top: top
        })
    }

    hideDropDowns() {
        this.setState({
            unitOptionsVisible: 'false',
        })
    }

}

const listItem = (item, context) => {
    const listStyles = StyleSheet.create({
        background: {
            backgroundColor: 'white',
            borderColor: 'lightgray',
            borderWidth: 1,
            padding: 6,
            width: 300,
        }
    })

    return (
        <View style={listStyles.background}>
            <TouchableOpacity
                onPress={() => updateUnitSelection(item, context)}
            >
                <Text style={[TextStyle.medium, { fontSize: 25 }]}>{item.label}</Text>
            </TouchableOpacity>
        </View>
    )
}

function updateUnitSelection(unit, context) {
    settingsHelper.setSavedUnit(unit)
        .then(storedUnit => {
            context.setState({
                unit: unit,
                unitOptionsVisible: 'false'
            })
        })
}


const styles = StyleSheet.create({
    background: {
        paddingTop: 30,
        paddingStart: 30,
        paddingEnd: 16,
        width: '100%',
        height: '100%'
    },
    settings: {
        justifyContent: 'flex-start',
    },
    settingLabel: {
        marginTop: 30,
        height: 20,
        color: 'gray',
    },
    settingOption: {
        marginTop: 6,
        width: '80%',
        height: 30,
        fontSize: 30,
        color: '#494949'
    },
    underLine: {
        marginTop: 6,
        height: 0.75,
        width: 300,
        backgroundColor: '#494949',
    },

})
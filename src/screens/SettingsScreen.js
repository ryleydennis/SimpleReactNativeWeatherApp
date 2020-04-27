import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import SettingsHelper from '../AsyncStorageHelpers/SettingsStorageHelper';
import { ViewStyle, TextStyle } from '../Styles';
import DropDown from '../DropDown';

const settingsHelper = new SettingsHelper()


export default class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            unit: {},
            timeZone: {},
            unitOptionsVisible: false,
            unitLocation: { top: 0, left: 0 }
        };
        this.updateUnitSelection = this.updateUnitSelection.bind(this)
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
                            onPress={() => {
                                var isVisible = !this.state.unitOptionsVisible
                                this.setState({ unitOptionsVisible: isVisible})
                            }}
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

                        <DropDown
                            visible={this.state.unitOptionsVisible}
                            data={settingsHelper.getAvailableUnits()}
                            location={this.state.unitLocation}
                            optionPressed={this.updateUnitSelection}
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
    }

    hideDropDowns() {
        this.setState({
            unitOptionsVisible: false,
        })
    }

    updateUnitSelection(unit) {
        settingsHelper.setSavedUnit(unit)
            .then(storedUnit => {
                this.setState({
                    unit: unit,
                    unitOptionsVisible: false,
                })
            })
    }
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
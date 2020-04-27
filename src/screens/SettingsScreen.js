import React, { Component } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, TouchableWithoutFeedback, TextInput, Switch } from 'react-native-gesture-handler';

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
            timeZoneOptionsVisible: false,
            unitLocation: { top: 0, left: 0 },
            timeZoneLocation: { top: 0, left: 0 },
            isEditingTimeZone: false,
            timeZoneSearch: '',
            filterEnabled: false,
        };
        this.updateUnitSelection = this.updateUnitSelection.bind(this)
        this.updateTimeZoneSelection = this.updateTimeZoneSelection.bind(this)
    }

    componentDidMount() {
        this._unsubscribe = this.state.navigation.addListener('focus', () => {
            settingsHelper.getSavedUnit()
                .then(storedUnit => {
                    this.setState({
                        unit: storedUnit,
                    })
                });
            settingsHelper.getSavedTimeZone()
                .then(storedTimeZone => {
                    this.setState({
                        timeZone: storedTimeZone,
                    })
                });
            settingsHelper.getTimeZoneFilter()
                .then(storedIsEnabled => {
                    this.setState({
                        filterEnabled: storedIsEnabled
                    })
                });
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    render() {
        return (
            <TouchableWithoutFeedback
                style={{ width: '100%', height: '100%' }}
                onPress={() => { this.hideDropDowns() }}
            >
                <LinearGradient
                    style={styles.background}
                    colors={['#FFFBF1', '#FFEDC0']}
                >
                    <View style={styles.settings} >
                        {/* TEMPERATURE UNIT */}
                        <Text style={[TextStyle.medium, styles.settingLabel]}>Units</Text>
                        <TouchableOpacity
                            onPress={() => {
                                var isVisible = !this.state.unitOptionsVisible
                                this.setState({ unitOptionsVisible: isVisible, timeZoneOptionsVisible: false, })
                            }}
                        >
                            <Text style={styles.settingOption}>{this.state.unit.label}</Text>
                        </TouchableOpacity>
                        <View
                            onLayout={event => { this.updateUnitLocation(event.nativeEvent.layout) }}
                            style={styles.underLine}
                        />


                        {/* TIME ZONE */}
                        <Text style={[TextStyle.medium, styles.settingLabel]}>Time Zone</Text>
                        <TextInput
                            style={styles.settingOption}
                            ref={input => { this.textInput = input }}
                            value={this.state.timeZoneOptionsVisible ? this.state.timeZoneSearch : this.state.timeZone.label}
                            onChangeText={search => this.setState({ timeZoneSearch: search })}
                            autoFocus={false}
                            onFocus={() => this.setupTimeZoneSearch()}
                            clearButtonMode='while-editing'
                        />
                        <View
                            onLayout={event => { this.updateTimeZoneLocation(event.nativeEvent.layout) }}
                            style={styles.underLine}
                        />

                        {/* TIME ZONE SWITCH */}
                        <Text style={[TextStyle.mild, styles.settingLabel, { marginTop: 20 }]}>Filter search results by time zone</Text>
                        <Switch
                            style={{ marginTop: 25 }}
                            value={this.state.filterEnabled}
                            onValueChange={newValue => this.switchFilterSetting(newValue)}
                        />

                        {/* DROPDOWNS FOR BOTH TEMP AND TIMEZONE */}
                        <DropDown
                            visible={this.state.unitOptionsVisible}
                            data={settingsHelper.getAvailableUnits()}
                            location={this.state.unitLocation}
                            optionPressed={this.updateUnitSelection}
                        />

                        <DropDown
                            visible={this.state.timeZoneOptionsVisible}
                            data={this.getFilteredTimeZones()}
                            location={this.state.timeZoneLocation}
                            optionPressed={this.updateTimeZoneSelection}
                        />

                    </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
        )
    }

    switchFilterSetting(newValue) {
        settingsHelper.setTimeZoneFilter(newValue)
            .then(result => {
                this.setState({
                    filterEnabled: newValue
                })
            })

    }

    getFilteredTimeZones() {
        return settingsHelper.getTimeZones().filter(zone => zone.label.includes(this.state.timeZoneSearch))
    }

    setupTimeZoneSearch() {
        this.setState({
            timeZoneOptionsVisible: true,
            unitOptionsVisible: false,
            timeZoneSearch: this.state.timeZone.label
        })
    }

    updateUnitLocation(layout) {
        var top = layout.y + layout.height
        this.setState({
            unitLocation: {
                left: layout.x,
                top: top
            }
        })
    }

    updateTimeZoneLocation(layout) {
        var top = layout.y + layout.height
        this.setState({
            timeZoneLocation: {
                left: layout.x,
                top: top
            }
        })
    }

    hideDropDowns() {
        Keyboard.dismiss()
        this.setState({
            unitOptionsVisible: false,
            timeZoneOptionsVisible: false,
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

    updateTimeZoneSelection(timezone) {
        settingsHelper.setSavedTimeZone(timezone)
            .then(storedZone => {
                this.setState({
                    timeZone: timezone,
                    timeZoneOptionsVisible: false,
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
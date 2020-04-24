import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ViewStyle, TextStyle } from '../Styles';

import SettingsHelper from '../AsyncStorageHelpers/SettingsStorageHelper';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';


const settingsHelper = new SettingsHelper()


export default function SettingsScreen({ navigation }) {
    const [unit, setUnit] = useState({});
    const [timeZone, setTimeZone] = useState({})

    const [unitOptionsVisible, setUnitOptionsVisible] = useState('false')
    const [unitLocation, setUnitLocation] = useState({
        top: 0,
        left: 0
    })

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            settingsHelper.getSavedUnit()
                .then(storedUnit => {
                    console.log(storedUnit)
                    setUnit(storedUnit)
                })
            settingsHelper.getSavedTimeZone()
                .then(storedTimeZone => {
                    console.log(storedTimeZone)
                    setTimeZone(storedTimeZone)
                })
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    return (
        <LinearGradient
            style={styles.background}
            colors={['#FFFBF1', '#FFEDC0']}
        >
            <View style={styles.settings}>
                <Text style={[TextStyle.medium, styles.settingLabel]}>Units</Text>
                <TouchableOpacity
                    onPress={() => {setUnitOptionsVisible(!unitOptionsVisible)}}
                >
                    <Text style={styles.settingOption}>{unit.label}</Text>
                </TouchableOpacity>
                <View
                    onLayout={event => { updateLocation(setUnitLocation, event.nativeEvent.layout) }}
                    style={styles.underLine}
                />

                <FlatList
                    data={unitOptionsVisible ? [] : settingsHelper.getAvailableUnits()}
                    renderItem={({ item }) => listItem(item)}
                    keyExtractor={item => item.label}
                    style={{ position: 'absolute', left: unitLocation.left, top: unitLocation.top }}
                />

                <Text style={[TextStyle.medium, styles.settingLabel]}>TimeZone</Text>
                <TouchableOpacity >
                    <Text style={styles.settingOption}>{timeZone.abbr}</Text>
                </TouchableOpacity>
                <View style={styles.underLine} />

            </View>
        </LinearGradient>
    )

}

const listItem = (item) => {
    return (
        <Text>{item.label}</Text>
    )
}


function updateLocation(setLocation, layout) {
    var top = layout.y + layout.height * 2
    setLocation({
        left: layout.x,
        top: top
    })
    console.log({
        left: layout.x,
        top: top
    })
}

function getPickerItems() {
    var options = settingsHelper.getAvailableUnits()
    console.log(options)

    var items = []
    options.forEach(option => items.push(<Picker.Item label={option.label} value={option.value} />))

    return items
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
        height: 30,
        width: '80%',
        fontSize: 30,
        color: '#494949'
    },
    underLine: {
        marginTop: 6,
        height: 0.75,
        width: '80%',
        backgroundColor: '#494949',
    },

})
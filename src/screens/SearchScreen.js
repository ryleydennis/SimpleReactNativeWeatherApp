import React, { Component, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather'
import Styles, { ViewStyle, TextStyle } from '../Styles'

export default function SearchScreen() {
    const [input, setInput] = useState('');
    const [cities, setCities] = useState(['Ann Arbor', 'Annable', 'Antonio']);

    return (
        <LinearGradient
            style={styles.background}
            colors={['#FFFBF1', '#FFEDC0']}
        >
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    placeholder='New York'
                    onChangeText={text => setInput(text)}
                />
                <View style={styles.underLine} />
            </View>
            <FlatList
                style={styles.searchList}
                data={cities}
                renderItem={({ item }) => (
                    cityCard({ name: item })
                )}
            />
        </LinearGradient>
    )
}

function cityCard(props) {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            >
            <View style={[ViewStyle.card, { marginTop: 6 }]}>
                <Icon
                    name="chevron-right"
                    color='#494949'
                    size={25}
                    style={cityCardStyles.chevron}
                />

                <View style={cityCardStyles.cityName}>
                    <Text style={TextStyle.medium}>{props.name}</Text>
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
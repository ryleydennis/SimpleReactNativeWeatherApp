import React, { Component, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather'
import Styles, { ViewStyle } from '../Styles'


export default function SearchScreen() {
    const [input, setInput] = useState('');

    return (
        <LinearGradient
            style={{ flex: 1, alignItems: 'center', paddingTop: 60 }}
            colors={['#FFFBF1', '#FFEDC0']}
        >
            <View style={ViewStyle.card}>
                <View style={styles.inputBox}>
                    <View style={styles.leftSpacer} />
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder='New York'
                            onChangeText={text => setInput(text)}
                        />
                        <View style={styles.underLine} />
                    </View>
                    <TouchableOpacity>
                        <Icon
                            color='#494949'
                            name="chevron-right"
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
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
        flexDirection: 'row',
        margin: 6,
        marginTop: 10,
        marginBottom: 10,
    }
})
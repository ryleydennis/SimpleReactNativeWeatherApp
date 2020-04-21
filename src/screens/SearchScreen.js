import React, { Component, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';


export default function SearchScreen() {
    const [input, setInput] = useState('');

    return (
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
            <LinearGradient
                style={{ flex: 1, alignItems: 'center' }}
                colors={['#FFFBF1', '#FFEDC0']}
            >
                    <TextInput
                        style={styles.input}
                        placeholder='New York'
                        onChangeText={text => setInput(text)}
                        
                    />
                    <View style={styles.underLine}/>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        textAlign: 'center',
        marginTop: 60,
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
    }
})
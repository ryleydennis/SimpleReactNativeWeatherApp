import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { TextStyle } from './Styles';

export default DropDown = (props) => {
    if (props.visible) {
        return (
                <View style={{ position: 'absolute', left: props.location.left, top: props.location.top, }}>
                    <FlatList
                        data={props.data.slice(0,10)}
                        renderItem={({ item }) => listItem(item, props.optionPressed)}
                        keyExtractor={item => item.label}
                        scrollEnabled={false}
                    />
                    { props.data.length > 11 ?
                        <Text style={[styles.background, {height: 40}]}>
                        ...
                        </Text> : <View/>
                    }
                </View>
            );
    } else {
        return (<View></View>)
    }


};

function listItem(item, optionPressed) {
    return (
        <View style={styles.background}>
            <TouchableOpacity
                onPress={() => optionPressed(item)}
            >
                <Text style={[TextStyle.medium, { fontSize: 25 }]}>{item.label}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
        borderColor: 'lightgray',
        borderWidth: 1,
        padding: 6,
        width: 300,
    }
})

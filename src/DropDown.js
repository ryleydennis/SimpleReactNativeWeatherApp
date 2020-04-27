import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { TextStyle } from './Styles';

export default DropDown = (props) => {
    if (props.visible) {
        return (
            <View style={{ position: 'absolute', left: props.location.left, top: props.location.top }}>
                <FlatList
                    data={props.data}
                    renderItem={({ item }) => listItem(item, props.optionPressed)}
                    keyExtractor={item => item.label}
                />
            </View>
        );
    } else {
        return (<View></View>)
    }
}

listItem = (item, optionPressed) => {
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
                onPress={() => optionPressed(item)}
            >
                <Text style={[TextStyle.medium, { fontSize: 25 }]}>{item.label}</Text>
            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({

})

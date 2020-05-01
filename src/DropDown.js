import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { TextStyle } from './Styles';

const DropDown = (props) => {
  const { visible, data, location, optionPressed } = props;
  if (visible) {
    return (
      <View style={{ position: 'absolute', left: location.left, top: location.top }}>
        <FlatList
          data={data.slice(0, 10)}
          renderItem={({ item }) => listItem(item, optionPressed)}
          keyExtractor={(item) => item.label}
          scrollEnabled={false}
        />
        {data.length > 11 ? <Text style={[styles.background, { height: 40 }]}>...</Text> : <View />}
      </View>
    );
  }
  return <View />;
};

function listItem(item, optionPressed) {
  return (
    <View style={styles.background}>
      <TouchableOpacity onPress={() => optionPressed(item)}>
        <Text style={[TextStyle.medium, { fontSize: 25 }]}>{item.label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 6,
    width: 300,
  },
});

export default DropDown;

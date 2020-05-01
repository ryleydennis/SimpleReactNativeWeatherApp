import { StyleSheet } from 'react-native';

const ViewStyle = StyleSheet.create({
  card: {
    marginTop: 16,
    borderColor: 'lightgray',
    borderWidth: 2,
    backgroundColor: '#FFFFFD',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 4,
    borderRadius: 6,
  },
});

const TextStyle = StyleSheet.create({
  mild: {
    fontSize: 16,
    color: '#292929',
  },
  medium: {
    fontSize: 20,
    color: '#494949',
  },
  large: {
    fontSize: 60,
    color: '#494949',
  },
  title: {
    fontSize: 30,
    color: '#494949',
  },
});

export { ViewStyle, TextStyle };

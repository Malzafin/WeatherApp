import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weather App</Text>
      <Text style={styles.info}>Temperature: °C</Text>
      <Text style={styles.info}>Lokalizacja: </Text>
    </View>
);

}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#e0f7fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});

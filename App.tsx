import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Aplikacja Pogodowa</Text>
      <Text style={styles.info}>Temperatura: --°C</Text>
      <Text style={styles.info}>Lokalizacja: --</Text>
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

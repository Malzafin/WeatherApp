import { Dimensions, View, Text, StyleSheet, Button } from 'react-native';
import { WeatherProvider, useWeather } from './src/WeatherContext';
import { useEffect, useState } from 'react';

export default function App() {
  return (
    <WeatherProvider>
      <WeatherContent />
    </WeatherProvider>
  );
}

function WeatherContent() {
  const weather = useWeather();

  const [screen, setScreen] = useState(Dimensions.get ('window'));

  useEffect (() => {
    const onChange  = ({window}) => {
      setScreen(window);
    };

    const resizeHandler = Dimensions.addEventListener('change', onChange);

    return () => {
      resizeHandler.remove();
    };
}, []);


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weather App</Text>
      <Text style={styles.info}>Temperatura: {weather?.temperature}°C</Text>
      <Text style={styles.info}>Lokalizacja: {weather?.location}</Text>
      <Button
        title="Refresh data"
        onPress={() => weather?.updateWeather()}
      />
      <Text style={styles.info}>{weather?.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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

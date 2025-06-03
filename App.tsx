import { Dimensions, View, Text, StyleSheet, Button, ScaledSize } from 'react-native';
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

  const [screen, setScreen] = useState<ScaledSize>(Dimensions.get('window'));
  const screenWidth = screen.width;
  const dynamicFontSize = screenWidth < 400 ? 22 : 26;
  const styles = createStyles(screen.width, dynamicFontSize);

  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      setScreen(window);
    };

    const resizeHandler = Dimensions.addEventListener('change', onChange);

    return () => {
      resizeHandler.remove();
    };
  }, []);

  return (
    <View style={[styles.container, screen.width > screen.height && styles.containerHorizontal]}>
      <View style={styles.block}>
        <Text style={styles.header}>Weather App</Text>
        <Text style={styles.info}>Temperatura: {weather?.temperature}°C </Text>
        <Text style={styles.info}>Lokalizacja: {weather?.location}</Text>
      </View>

      <View style={styles.block}>
        <Button title="Refresh data" onPress={() => weather?.updateWeather()} />
        <Text style={styles.info}>{weather?.status}</Text>
      </View>
    </View>
  );
}

const createStyles = (width: number, dynamicFontSize: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e0f7fa',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      width: '100%',
      paddingHorizontal: 20,
    },

    header: {
      fontSize: dynamicFontSize,
      fontWeight: 'bold',
      marginBottom: 20,
    },

    info: {
      fontSize: width > 500 ? 20 : 16,
      marginBottom: 10,
    },

    containerHorizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },

    block: {
      margin: 10,
      alignItems: 'center',
    },
  });

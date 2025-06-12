import { useEffect, useState } from 'react';
import { Dimensions, View, Text, StyleSheet, Button, ScaledSize } from 'react-native';
import { useWeather } from '../WeatherContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

export default function HomeScreen() {
  const weather = useWeather();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
        <View style={styles.buttonSpacing}>
          <Button title="Odśwież dane" onPress={() => weather?.updateWeather()} />
        </View>
        <View style={styles.buttonSpacing}>
          <Button
            title="Zobacz szczegóły"
            onPress={() =>
              navigation.navigate('Details', {
                location: weather?.location ?? '--',
                temperature: weather?.temperature ?? '--',
                description: weather?.description ?? '--',
                icon: weather?.icon ?? '--',
                status: weather?.status ?? '--',
              })
            }
          />
        </View>
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

    buttonSpacing: {
      marginBottom: 10,
      width: 200,
    },
  });

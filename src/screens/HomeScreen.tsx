/**
 * HomeScreen – pokazuje podstawowe dane pogodowe oraz przycisk odświeżania
 */
import { useEffect, useState } from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  ScaledSize,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useWeather } from '../WeatherContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const weather = useWeather();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  /* responsywne wymiary */
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
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          screen.width > screen.height && styles.containerHorizontal,
        ]}
      >
        {/* --- KARTA 1 : podstawowe dane --- */}
        <View style={styles.card}>
          <Text style={styles.header}>
            <Text style={styles.highlight}>Weather App</Text>
          </Text>
          <Text style={styles.info}>Lokalizacja: {weather?.location}</Text>
          <Text style={styles.info}>Temperatura: {weather?.temperature}°C</Text>
        </View>

        {/* separator */}
        <View style={styles.separator} />

        {/* --- KARTA 2 : przyciski + status --- */}
        <View style={styles.card}>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.touchButton}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('Details', {
                  location: weather?.location ?? '--',
                  temperature: weather?.temperature ?? '--',
                  description: weather?.description ?? '--',
                  icon: weather?.icon ?? '--',
                  status: weather?.status ?? '--',
                })
              }
            >
              <Text style={styles.buttonTxt}>Zobacz szczegóły</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.touchButton}
              activeOpacity={0.8}
              onPress={() => weather?.updateWeather()}
            >
              <Text style={styles.buttonTxt}>Odśwież dane</Text>
            </TouchableOpacity>
          </View>

          {/* status / błąd */}
          <Text style={styles.info}>{weather?.status}</Text>
          {weather?.error && <Text style={[styles.info, styles.errorText]}>{weather.error}</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const BG = '#d0ebff';
const PRIMARY = '#0d99ff';

const createStyles = (width: number, dynamicFontSize: number) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: BG,
    },
    container: {
      flexGrow: 1,
      backgroundColor: BG,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      width: '100%',
    },
    containerHorizontal: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      paddingHorizontal: 12,
    },

    card: {
      marginVertical: 20,
      padding: 24,
      backgroundColor: '#fff',
      borderRadius: 12,
      elevation: 4, // cień Android
      shadowColor: '#000', // cień iOS
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      alignItems: 'center',
      minWidth: width > 500 ? 400 : '80%',
      width: width > 500 ? '45%' : '80%',
    },

    header: {
      fontSize: dynamicFontSize,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    highlight: {
      color: PRIMARY,
    },
    info: {
      fontSize: width > 500 ? 20 : 16,
      marginBottom: 10,
      textAlign: 'center',
    },

    separator: {
      height: 1,
      width: '80%',
      backgroundColor: '#ccc',
      marginVertical: 20,
    },

    button: {
      marginVertical: 6,
      width: '100%',
      maxWidth: 220,
    },
    touchButton: {
      backgroundColor: PRIMARY,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      elevation: 3, // Android
      shadowColor: '#000', // Iphone
      shadowOpacity: 0.25, // Iphone
      shadowRadius: 4, // Android
      shadowOffset: { width: 0, height: 2 }, // Android
    },
    buttonTxt: {
      color: '#fff',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: 14,
    },

    errorText: {
      color: 'red',
      textAlign: 'center',
      marginTop: 4,
    },
  });

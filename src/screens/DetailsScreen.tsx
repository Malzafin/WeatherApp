/**
 * DetailsScreen – pełne informacje o pogodzie
 */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScaledSize, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;

export default function DetailsScreen() {
  const route = useRoute<DetailsRouteProp>();
  const { location, temperature, description, icon, status } = route.params;

  /* responsywność */
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

  /* ikonka @4x */
  const iconUrl = icon && icon !== '--'
  ? `https://openweathermap.org/img/wn/${icon}@4x.png`
  : undefined;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          screen.width > screen.height && styles.containerHorizontal,
          styles.scrollContainer,
        ]}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Szczegóły pogody</Text>
          <Text style={styles.info}>Lokalizacja: {location}</Text>
          <Text style={styles.info}>Temperatura: {temperature}°C</Text>
          <Text style={styles.info}>Opis: {description}</Text>
           {iconUrl && (
            <Image source={{ uri: iconUrl }} style={styles.icon} />
          )}
        </View>
        <Text style={styles.status}>{status}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

/* --- Style --- */
const BG = '#d0ebff';
const createStyles = (width: number, dynamicFontSize: number) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: BG,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
    },
    scrollContainer: {
      backgroundColor: '#d0ebff',
    },
    safeArea: {
      flex: 1,
      backgroundColor: BG,
    },
    title: {
      fontSize: dynamicFontSize,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    info: {
      fontSize: width > 500 ? 20 : 16,
      marginBottom: 10,
      textAlign: 'center',
    },

    card: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 4, // Android
    shadowColor: '#000', // Iphone
    shadowOpacity: 0.1, // Iphone
    shadowRadius: 10, //Iphone
    shadowOffset: { width: 0, height: 4 }, // Iphone
    alignItems: 'center',
    marginBottom: 20,
  },
    status: {
      marginTop: 20,
      fontStyle: 'italic',
      color: '#555',
    },
    icon: {
      width: 100,
      height: 100,
      marginVertical: 10,
      resizeMode: 'contain',
    },
    containerHorizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  });

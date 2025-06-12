import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;

export default function DetailsScreen() {
  const route = useRoute<DetailsRouteProp>();
  const { location, temperature, description, icon, status } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Szczegóły pogody</Text>
      <Text style={styles.info}>Lokalizacja: {location}</Text>
      <Text style={styles.info}>Temperatura: {temperature}°C</Text>
      <Text style={styles.info}>Opis: {description}</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
        style={styles.icon}
      />
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f8e9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
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
  },
});

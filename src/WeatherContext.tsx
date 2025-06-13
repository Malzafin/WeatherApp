/**
 * WeatherContext – przechowuje globalny stan pogody.
 * Zapewnia pobieranie danych (GPS + OpenWeather) i fallback offline.
 */
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

/** Dane udostępniane w kontekście */
type WeatherData = {
  location: string;
  temperature: string;
  description: string;
  icon: string;
  status: string;
  error: string | null;
  updateWeather: () => void;
};

type StoredWeather = {
  location: string;
  temperature: string;
  description: string;
  icon: string;
  status: string;
};

const WeatherContext = createContext<WeatherData | null>(null);

/** Provider otacza całą aplikację w App.tsx */
export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  /* --- Zmienny stan --- */
  const [location, setLocation] = useState('--');
  const [temperature, setTemperature] = useState('--');
  const [description, setDescription] = useState('--');
  const [icon, setIcon] = useState('--');
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);

   /**
   *  Ładuje bufor z AsyncStorage przy starcie aplikacji (tryb offline)
   */
  useEffect(() => {
    const loadCachedWeather = async () => {
      try {
        const saved = await AsyncStorage.getItem('WeatherData');
        if (saved) {
          const parsed = JSON.parse(saved);
          setTemperature(parsed.temperature);
          setLocation(parsed.location);
          setDescription(parsed.description);
          setIcon(parsed.icon);
          setStatus('Wyświetlono dane offline');
        }
      } catch (error) {
        console.error('Błąd podczas ładowania danych z pamięci:', error);
      }
    };
    loadCachedWeather();
  }, []);

   /**
   *  Główna akcja – pobiera lokalizację i dane pogodowe
   */
  const updateWeather = async () => {
    console.log('kliknięto odswieżenie');
    setError(null); // czyścimy stary błąd
    try {
      /* 1.  Uprawnienia location */
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setStatus('Brak zgody na lokalizację');
        setError('Brak zgody na lokalizację');
        Alert.alert('Błąd', 'Nie przyznano dostępu do lokalizacji.');
        return;
      }

      /* 2.  GPS */
      const locationData = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = locationData.coords;

      /* 3.  Reverse geocoding */
      const place = await Location.reverseGeocodeAsync({ latitude, longitude });
      const city = place[0]?.city || place[0]?.region || 'Nieznane miasto';

      /* 4.  Fetch do OpenWeather */
      const apiKey = 'fab91f1b851104105bf6f56b19676548';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pl`
      );

      const data = await response.json();
      const district = data.name;

      /* 5.  Aktualizacja stanu + zapis offline */
      setTemperature(data.main.temp.toFixed(1));
      setLocation(`${city}, ${district}`);
      setDescription(data.weather[0].description);
      setIcon(data.weather[0].icon);
      setStatus('Dane pobrane');
      setError(null);
      console.log('dane pobrane poprawnie');

      const toStore: StoredWeather = {
        temperature: data.main.temp.toFixed(1),
        location: `${city}, ${district}`,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        status: 'Dane pobrane',
      };

      await AsyncStorage.setItem('WeatherData', JSON.stringify(toStore));
    } catch (error) {
      console.error('Błąd pobierania danych', error);
      setStatus('Błąd pobierania danych');
      setError('Nie udało się pobrać danych pogodowych');
      Alert.alert('Błąd', 'Nie udało się pobrać danych pogodowych. Sprawdź połączenie internetowe.');

      try {
        const saved = await AsyncStorage.getItem('WeatherData');
        if (saved) {
          const parsed: StoredWeather = JSON.parse(saved);
          setTemperature(parsed.temperature);
          setLocation(parsed.location);
          setDescription(parsed.description);
          setIcon(parsed.icon);
          setStatus('Wyświetlono dane offline');
        }
      } catch (error) {
        console.error('Błąd podczas ładowania danych z pamięci:', error);
        setError('Nie udało się załadować danych offline');
      }
    }
  };

   /* ------------- Provider ------------- */
  return (
    <WeatherContext.Provider
      value={{
        location,
        temperature,
        description,
        icon,
        updateWeather,
        status,
        error,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

/** Hook ułatwiający dostęp do kontekstu */
export const useWeather = () => useContext(WeatherContext);

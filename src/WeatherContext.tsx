import React, { createContext, useState, useContext, ReactNode } from 'react';
import * as Location from 'expo-location';

type WeatherData = {
  location: string;
  temperature: string;
  description: string;
  icon: string;
  updateWeather: () => void;
  status: string;
};

const WeatherContext = createContext<WeatherData | null>(null);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState('--');
  const [temperature, setTemperature] = useState('--');
  const [description, setDescription] = useState('--');
  const [icon, setIcon] = useState('--');
  const [status, setStatus] = useState('');

  const updateWeather = async () => {
    console.log('kliknięto odswieżenie');
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setStatus('Brak zgody na lokalizację');
        return;
      }

      const locationData = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = locationData.coords;

      // reverse geocoding - dla miasta
      const place = await Location.reverseGeocodeAsync({ latitude, longitude });
      const city = place[0]?.city || place[0]?.region || 'Nieznane miasto';

      const apiKey = 'fab91f1b851104105bf6f56b19676548';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pl`
      );

      const data = await response.json();
      const district = data.name;

      setTemperature(data.main.temp.toFixed(1));

      setLocation(`${city}, ${district}`);
      setDescription(data.weather[0].description);
      setIcon(data.weather[0].icon);
      setStatus('Dane pobrane');
      console.log('Weather data downloaded correctly');
    } catch (error) {
      console.error('Error while receiving weather data:', error);
      setStatus('Błąd pobierania danych');
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        location,
        temperature,
        description,
        icon,
        updateWeather,
        status,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
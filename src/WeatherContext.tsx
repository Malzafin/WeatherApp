import React, {createContext, useState, useContext, ReactNode } from 'react';
type WeatherData = {
    location: string,
    temperature: string,
    description: string,
    icon: string,
    updateWeather: () => void;
};


const WeatherContext = createContext<WeatherData | null>(null);

export const WeatherProvider = ({ children }: {children: ReactNode}) => {
    const [location, setLocation] = useState('--');
    const [temperature, setTemperature] = useState('--');
    const [description, setDescription] = useState('--');
    const [icon, setIcon] = useState('--');

    const updateWeather = () => {
        console.log('Pobrane dane pogody');
    }

    return (
        <WeatherContext.Provider value={{
            location,
            temperature,
            description,
            icon,
            updateWeather,
        }}>
        
        
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = () => useContext(WeatherContext);
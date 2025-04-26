import React, {createContext, useState, useContext, ReactNode } from 'react';
type WeatherData = {
    location: string,
    temperature: string,
    description: string,
    icon: string,
    updateWeather: () => void;
    status: string;
};


const WeatherContext = createContext<WeatherData | null>(null);

export const WeatherProvider = ({ children }: {children: ReactNode}) => {
    const [location, setLocation] = useState('--');
    const [temperature, setTemperature] = useState('--');
    const [description, setDescription] = useState('--');
    const [icon, setIcon] = useState('--');
    const [status, setStatus] = useState('');

    const updateWeather = async () => {
        console.log('kliknięto odswieżenie')
        try{
            const apiKey = 'fab91f1b851104105bf6f56b19676548';
            const city = 'Warsaw'; 

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`
            );

            const data = await response.json();

            setTemperature(data.main.temp.toFixed(1));
            setLocation(data.name);
            setDescription(data.weather[0].description);
            setIcon(data.weather[0].icon);

            setStatus('Data downloaded correctly')
            console.log('Weather data downloaded correctly');

        }

        catch (error) {
            console.error('Error while receiving weather data:', error);
            setStatus('Data download error');
        }
    };

    return (
        <WeatherContext.Provider value={{
            location,
            temperature,
            description,
            icon,
            updateWeather,
            status,
        }}>
        
        
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = () => useContext(WeatherContext);
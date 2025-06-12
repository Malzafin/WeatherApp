import React from "react";
import { View, Text, StyleSheet, Image } from 'react-native';
import { useWeather } from "../src/WeatherContext";

export default function DetailsScreen(){
    const weather = useWeather();

    if (!weather) {
        return (
            <View style={styles.container}>
                <Text>Brak danych pogodowych</Text>
            </View>
        );
    }

    const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Szczegóły pogody</Text>
            <Text style={styles.info}>Lokalizacja: {weather.location}</Text>
            <Text style={styles.info}>Temperatura: {weather.temperature}°C</Text>
            <Text style={styles.info}>Opis: {weather.description}</Text>
            <Image source={{ uri: iconUrl}} style={styles.icon}/>
            <Text style={styles.status}>{weather.status}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
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
    info:{
        fontSize: 18,
        marginBottom: 10,
    },
    status:{
        marginTop: 20,
        fontStyle: 'italic',
        color: '#555',
    },
    icon: {
        width: 100,
        height: 100,
        marginVertical: 10,
    }
})
# WeatherApp – aplikacja pogodowa

Aplikacja mobilna napisana w React Native z użyciem Expo. Wyświetla aktualną pogodę na podstawie lokalizacji GPS użytkownika. Projekt przygotowany jako zaliczenie na przedmiot "Języki programowania urządzeń mobilnych".

## Funkcjonalności

- Pobieranie lokalizacji użytkownika z wykorzystaniem GPS (expo-location)
- Pobieranie danych pogodowych z OpenWeatherMap API
- Wyświetlanie temperatury, opisu pogody oraz lokalizacji (miasto i dzielnica)
- Obsługa braku zgody na lokalizację
- Zarządzanie stanem aplikacji przy pomocy Context API
- Podstawowy interfejs użytkownika zbudowany w oparciu o Flexbox

## Architektura

Aplikacja korzysta z Context API do zarządzania globalnym stanem pogody. Dane są pobierane w asynchroniczny sposób (async/await), a komponent główny jest otoczony przez `WeatherProvider`.

Struktura plików:

/WeatherApp
├── App.tsx // główny komponent aplikacji
└── /src
└── WeatherContext.tsx // kontekst pogodowy z logiką API i lokalizacji

## Technologie

- React Native (Expo)
- TypeScript
- Context API
- Expo Location
- OpenWeatherMap API

## Wymagania

- Node.js (zalecana wersja 18 lub wyższa)
- Expo CLI (`npm install -g expo-cli`)
- Aplikacja Expo Go na telefonie (Android/iOS)

## Instalacja i uruchomienie

1. Sklonuj repozytorium:

git clone https://github.com/Malzafin/WeatherApp

2. Przejdź do folderu projektu:

3. Zainstaluj zależności:

npm install

4. Uruchom aplikację:

npx expo start

5. Zeskanuj kod QR aplikacją **Expo Go** na telefonie

## Autor

Imię i nazwisko: Mateusz Gajewski
Kierunek: Informatyka
Rok studiów: 3
Przedmiot: Języki programowania urządzeń mobilnych

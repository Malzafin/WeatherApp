# WeatherApp – aplikacja pogodowa

Aplikacja mobilna napisana w React Native z użyciem Expo. Wyświetla aktualną pogodę na podstawie lokalizacji GPS użytkownika. Projekt przygotowany jako zaliczenie na przedmiot "Języki programowania urządzeń mobilnych".

## Funkcjonalności

- Pobieranie lokalizacji użytkownika z wykorzystaniem GPS (expo-location)
- Pobieranie danych pogodowych z OpenWeatherMap API
- Wyświetlanie temperatury, opisu pogody oraz lokalizacji (miasto i dzielnica)
- Obsługa braku zgody na lokalizację
- Zarządzanie stanem aplikacji przy pomocy Context API
- Podstawowy interfejs użytkownika zbudowany w oparciu o Flexbox
- Nawigacja między ekranami: ekran główny i ekran szczegółów (React Navigation)
- Przekazywanie danych między ekranami i obsługa historii nawigacji
- Przechowywanie danych offline w pamięci lokalnej (AsyncStorage)
- Automatyczne ładowanie danych offline po uruchomieniu aplikacji
- Obsługa zmiany orientacji i responsywność interfejsu (Dimensions API)
- Formatowanie kodu: Prettier + ESLint

## Architektura

Aplikacja korzysta z Context API do zarządzania globalnym stanem pogody. Dane są pobierane w asynchroniczny sposób (async/await)

Architektura opiera się na podziale:

- `WeatherContext` do obsługi lokalizacji, pobierania i przechowywania danych pogodowych
- `React Navigation` do zarządzania ekranami
- `AsyncStorage` do zachowywania danych offline
- `Dimensions` do obsługi zmian rozmiaru ekranu i orientacji

Struktura plików:
```bash
/WeatherApp
├── App.tsx                      # Główny komponent aplikacji (start point)
├── index.ts                     # Entry point dla bundlera
├── tsconfig.json                # Konfiguracja TypeScript
├── eslint.config.cjs            # Konfiguracja ESLint (flat config)
├── .prettierrc                  # Konfiguracja Prettiera
├── package.json                 # Plik konfiguracyjny projektu (z zależnościami)
├── /src
│   ├── WeatherContext.tsx      # Kontekst globalny do zarządzania danymi pogodowymi
│   ├── /screens
│   │   ├── HomeScreen.tsx      # Ekran główny z pogodą
│   │   └── DetailsScreen.tsx   # Ekran szczegółowy z danymi pogodowymi
│   └── /navigation
│       └── RootNavigator.tsx   # Nawigacja między ekranami (React Navigation Stack)
├── /assets                      # (opcjonalnie) pliki statyczne, np. ikony, obrazy
├── /.expo                       # Pliki generowane przez Expo (np. ustawienia lokalne)
├── /node_modules                # Zainstalowane zależności

```

## Technologie

- React Native (Expo)
- TypeScript
- Context API
- Expo Location
- OpenWeatherMap API
- React Navigation
- AsyncStorage
- ESLint + Prettier

## Jakość kodu i stylowania

- Formatowanie kodu: Prettier
- Lintowanie i kontrola stylu: ESLint
- brak stylów inline - przestrzeganie dobrych praktyk `react-native/no-inline-styles`

Uruchamianie:

```bash
npx run format
npm run lint
```

## Wymagania

- Node.js (zalecana wersja 18 lub wyższa)
- Expo CLI (`npm install -g expo-cli`)
- Aplikacja Expo Go na telefonie (Android/iOS)

## Instalacja i uruchomienie

1. Sklonuj repozytorium:

git clone https://github.com/Malzafin/WeatherApp

2. Przejdź do folderu projektu: 

cd WeatherApp

3. Zainstaluj zależności:

npm install

4. Uruchom aplikację:

npx expo start

5. Zeskanuj kod QR aplikacją **Expo Go** na telefonie

## Autor

Imię i nazwisko: Mateusz Gajewski
Numer albumu: 49591
Kierunek: Informatyka
Rok studiów: 3
Przedmiot: Języki programowania urządzeń mobilnych

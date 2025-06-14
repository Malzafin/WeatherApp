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
- Obsługa orientacji poziomej (horyzontalnej)
- Warunkowe ładowanie ikon pogodowych

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
├── .expo/                      # Konfiguracja środowiska Expo
├── .vscode/                    # Ustawienia edytora (opcjonalne)
├── assets/                     # Zasoby statyczne (np. grafiki)
├── node_modules/               # Zainstalowane zależności
├── src/                        # Główna logika aplikacji
│ ├── navigation/
│ │ └── RootNavigator.tsx       # Konfiguracja stosu nawigacji
│ ├── screens/
│ │ ├── HomeScreen.tsx          # Ekran główny z pogodą
│ │ └── DetailsScreen.tsx       # Ekran ze szczegółami pogody
│ └── WeatherContext.tsx        # Kontekst pogodowy (API i lokalizacja)
├── .gitignore
├── .prettierignore
├── .prettierrc                 # Konfiguracja Prettiera
├── app.json                    # Konfiguracja aplikacji Expo
├── App.tsx                     # Punkt wejściowy aplikacji
├── eslint.config.cjs           # Konfiguracja ESLinta
├── index.ts
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json               # Konfiguracja TypeScript
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
- React Native SafeAreaContext (obsługa bezpiecznego obszaru ekranów)
- ScrollView – zapewnienie przewijalności w trybie horyzontalnym i na małych ekranach

## Jakość kodu i stylowania

- Formatowanie kodu: Prettier
- Lintowanie i kontrola stylu: ESLint
- brak stylów inline - przestrzeganie dobrych praktyk `react-native/no-inline-styles`

Uruchamianie:

```bash
npm run format
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

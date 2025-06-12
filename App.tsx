import { WeatherProvider} from './src/WeatherContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <WeatherProvider>
      <RootNavigator />
    </WeatherProvider>
  );
}


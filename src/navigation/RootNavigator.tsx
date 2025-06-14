import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

/* -------- typy -------- */
export type RootStackParamList = {
  Home: undefined;
  Details: {
    location: string;
    temperature: string;
    description: string;
    icon: string;
    status: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/* -------- wspólne opcje nagłówka -------- */
const defaultScreenOptions: NativeStackNavigationOptions = {
  headerStyle: { backgroundColor: '#0d99ff' },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
};

/* -------- Navigator -------- */
export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultScreenOptions} initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

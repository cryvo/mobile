// File: mobile-app/App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator }  from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import API from './utils/api';
import CrybotDashboard from './screens/CrybotDashboard';
import MarketsScreen     from './screens/MarketsScreen';
import OptionsScreen     from './screens/OptionsScreen';
import StocksScreen      from './screens/StocksScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Markets">
          <Stack.Screen 
            name="CrybotDashboard" 
            component={CrybotDashboard} 
            options={{ title: 'CryBot Dashboard' }}
          />
          <Stack.Screen 
            name="Markets" 
            component={MarketsScreen}
            options={{ title: 'Markets' }}
          />
          <Stack.Screen 
            name="Options" 
            component={OptionsScreen}
            options={{ title: 'Options Strategies' }}
          />
          <Stack.Screen 
            name="Stocks" 
            component={StocksScreen}
            options={{ title: 'Stocks Strategies' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

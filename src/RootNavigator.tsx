import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import HealthDashboardScreen from './screens/HealthDashboardScreen';
import ActivityTrackingScreen from './screens/ActivityTrackingScreen';

export type RootStackParamList = {
  Home: undefined;
  HealthDashboard: undefined;
  ActivityTracking: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HealthDashboard" component={HealthDashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ActivityTracking" component={ActivityTrackingScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator; 
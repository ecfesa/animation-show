import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import HealthDashboardScreen from './screens/HealthDashboardScreen';
import ActivityTrackingScreen from './screens/ActivityTrackingScreen';
import { useAnimation } from './context/AnimationContext';

export type RootStackParamList = {
  Home: undefined;
  HealthDashboard: undefined;
  ActivityTracking: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { animationsEnabled } = useAnimation();
  const screenOptions = {
    headerShown: false,
    animation: animationsEnabled ? undefined : 'none',
    transitionSpec: {
      open: {
        animation: 'timing',
        config: { duration: 500 },
      },
      close: {
        animation: 'timing',
        config: { duration: 500 },
      },
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" component={HomeScreen} options={screenOptions}/>
        <Stack.Screen name="HealthDashboard" component={HealthDashboardScreen} options={screenOptions}/>
        <Stack.Screen name="ActivityTracking" component={ActivityTrackingScreen} options={screenOptions}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator; 
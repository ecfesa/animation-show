import React from 'react';
import RootNavigator from './src/RootNavigator';
import { AnimationProvider } from './src/context/AnimationContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AnimationProvider>
        <RootNavigator />
      </AnimationProvider>
    </GestureHandlerRootView>
  );
}

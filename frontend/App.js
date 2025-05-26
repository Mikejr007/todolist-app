import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import {TaskContextProvider} from './src/app/contexts/TaskContext.js';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
   
    <GestureHandlerRootView style={styles.container}>
    <TaskContextProvider>
      <NavigationContainer>
    <AppNavigation />
  </NavigationContainer>
    </TaskContextProvider>
    </GestureHandlerRootView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
  },
});
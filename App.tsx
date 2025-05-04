// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from './routes/home_screen';

import AddFormScreen from './Add_Form';

export type RootStackParamList = {
  Home: undefined;
  AddForm: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Rentah' }} />
        <Stack.Screen name="AddForm" component={AddFormScreen} options={{ title: 'Add Form' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

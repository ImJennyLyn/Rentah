// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
import AddFormScreen from './Add_Form'; // 👈 Import the form screen

type RootStackParamList = {
  Home: undefined;
  AddForm: undefined;
};

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const Stack = createStackNavigator<RootStackParamList>();

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to Add Form" onPress={() => navigation.navigate('AddForm')} />
    </View>
  );
};

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

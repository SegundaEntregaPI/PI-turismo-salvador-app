import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home';
import PontosTuristicos from './src/screens/PontosTuristicos';
import Eventos from './src/screens/Eventos';
import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro'; // 👉 Adicionado

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PontosTuristicos" component={PontosTuristicos} />
        <Stack.Screen name="Eventos" component={Eventos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;




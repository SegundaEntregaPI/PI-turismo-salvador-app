import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home';
import PontosTuristicos from './src/screens/PontosTuristicos';
import ExperienciaLocal from './src/screens/ExperienciaLocal';
import Eventos from './src/screens/ExperienciaLocal';
import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';

import PontosScreen from './src/screens/FavoritosScreen';

const Stack = createStackNavigator();

const listaDePontos = [
  { id: 1, nome: 'Cristo Redentor', descricao: 'Rio de Janeiro' },
  { id: 2, nome: 'Praia de Copacabana', descricao: 'Famosa praia carioca' },
  { id: 3, nome: 'Pão de Açúcar', descricao: 'Vista panorâmica' },
];

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PontosTuristicos" component={PontosTuristicos} />
        <Stack.Screen name="ExperienciaLocal" component={ExperienciaLocal} />
        <Stack.Screen name="Eventos" component={Eventos} />

        {/* Tela com favoritos */}
        <Stack.Screen
  name="Pontos"
  component={PontosScreen}
  initialParams={{ userId: 1, pontos: listaDePontos }}
  options={{ title: 'Pontos Turísticos' }}
/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

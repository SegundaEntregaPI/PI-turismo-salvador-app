import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const pontos = [
  {
    id: 4,
    nome: 'Farol da Barra',
    descricao:
      'O Farol da Barra é um dos cartões postais de Salvador, localizado na entrada da Baía de Todos os Santos.',
    latitude: -13.0025,
    longitude: -38.5203,
  },
  {
    id: 5,
    nome: 'Elevador Lacerda',
    descricao:
      'O Elevador Lacerda é um dos cartões-postais de Salvador, ligando a cidade baixa à cidade alta desde 1873.',
    latitude: -12.9714,
    longitude: -38.5108,
  },
  {
    id: 6,
    nome: 'Igreja de Bonfim',
    descricao:
      'A Igreja do Bonfim é um dos principais centros de fé de Salvador, famosa por suas fitas coloridas e orações.',
    latitude: -12.9716,
    longitude: -38.4521,
  },
];
const experiencias = [
  {
    id: 1,
    nome: 'Praia do Amor',
    descricao: 'Uma bela praia com falésias e mar cristalino.',
    latitude: -6.2376,
    longitude: -35.0418,
  },
  {
    id: 2,
    nome: 'Feira de Artesanato',
    descricao: 'Feira local com comidas típicas e arte popular.',
    latitude: -6.2400,
    longitude: -35.0450,
  },
  {
    id: 3,
    nome: 'Trilha da Serra Verde',
    descricao: 'Trilha ecológica com vistas panorâmicas.',
    latitude: -6.2450,
    longitude: -35.0480,
  },
];


const Home = () => {
  const navigation = useNavigation();

  const irParaFavoritos = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        navigation.navigate('Pontos', {
          pontos,
          userId: parseInt(userId),
        });
      } else {
        alert('Usuário não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar userId:', error);
      alert('Erro ao carregar usuário.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/home.jpg')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Bem-vindo ao Turismo em Salvador!</Text>
        <Text style={styles.subtitle}>Explore os melhores pontos turísticos</Text>

        {/* Botão Pontos Turísticos */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PontosTuristicos', { pontos })}
        >
          <Text style={styles.buttonText}>Ver Pontos Turísticos</Text>
        </TouchableOpacity>

        {/* Botão Experiência Local */}
        <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('ExperienciaLocal', { experiencias })}
>
  <Text style={styles.buttonText}>Ver Experiências Locais</Text>
</TouchableOpacity>

        {/* Botão Favoritos */}
        <TouchableOpacity style={styles.button} onPress={irParaFavoritos}>
          <Text style={styles.buttonText}>Ver Favoritos</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#008CBA',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
});

export default Home;

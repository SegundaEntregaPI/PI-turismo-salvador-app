import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const PontosTuristicos = ({ route }) => {
  const { pontos = [] } = route.params || {};
  const [userId, setUserId] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const carregarUserIdEFavoritos = async () => {
      const id = await AsyncStorage.getItem('userId');
      if (id) {
        setUserId(parseInt(id));
        const res = await api.get(`/favoritos/user/${id}`);
        setFavoritos(res.data);
      }
    };
    carregarUserIdEFavoritos();
  }, []);

  const abrirLocalizacao = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const isFavorito = (pontoId) => favoritos.some(f => f.nome === pontos.find(p => p.id === pontoId).nome);

  const toggleFavorito = async (ponto) => {
    if (!userId) return;
    if (isFavorito(ponto.id)) {
      try {
        await api.delete('/favoritos', {
          data: {
            userId,
            pontoTuristicoId: ponto.id,
            experienciaLocalId: null,
          },
        });
        setFavoritos(favoritos.filter(f => f.nome !== ponto.nome));
      } catch (err) {
        console.error('Erro ao desfavoritar:', err);
      }
    } else {
      try {
        await api.post('/favoritos', {
          userId,
          pontoTuristicoId: ponto.id,
          experienciaLocalId: null,
        });
        setFavoritos([...favoritos, { nome: ponto.nome, descricao: ponto.descricao, tipo: 'PontoTuristico' }]);
      } catch (err) {
        console.error('Erro ao favoritar:', err);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {pontos.map((ponto) => (
        <View key={ponto.id} style={styles.card}>
          <Image
            source={
              ponto.nome === 'Farol da Barra' 
                ? require('../assets/images/farol-da-barra.jpg')
                : ponto.nome === 'Elevador Lacerda'
                ? require('../assets/images/elevador-lacerda.jpg')
                : require('../assets/images/basilica-bonfim.jpg')
            }
            style={styles.image}
          />
          <Text style={styles.title}>{ponto.nome}</Text>
          <Text style={styles.description}>{ponto.descricao}</Text>

          <TouchableOpacity
            style={styles.link}
            onPress={() => abrirLocalizacao(ponto.latitude, ponto.longitude)}
          >
            <Text style={styles.linkText}>Localização</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.favButton, isFavorito(ponto.id) ? styles.favoritado : styles.naoFavoritado]}
            onPress={() => toggleFavorito(ponto)}
          >
            <Text style={styles.linkText}>
              {isFavorito(ponto.id) ? 'Desfavoritar' : 'Favoritar'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    padding: 15,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  link: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  linkText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  favButton: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 5,
  },
  favoritado: {
    backgroundColor: '#dc3545',
  },
  naoFavoritado: {
    backgroundColor: '#6c757d',
  },
});

export default PontosTuristicos;

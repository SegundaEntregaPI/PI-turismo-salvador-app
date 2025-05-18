import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const ExperienciaLocal = ({ route }) => {
  const { experiencias = [] } = route.params || {};
  const [userId, setUserId] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const fetchUserAndFavoritos = async () => {
      let id = route.params?.userId;
      if (!id) {
        const storedId = await AsyncStorage.getItem('userId');
        id = storedId ? parseInt(storedId) : null;
      }

      if (id) {
        setUserId(id);
        carregarFavoritos(id);
      }
    };

    fetchUserAndFavoritos();
  }, []);

  const carregarFavoritos = async (id) => {
    try {
      const response = await api.get(`/favoritos/user/${id}`);
      setFavoritos(response.data);
    } catch (err) {
      console.log('Erro ao buscar favoritos:', err);
    }
  };

  const abrirLocalizacao = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const isFavorito = (expId) => {
    return favoritos.some(fav =>
      fav.tipo === 'ExperienciaLocal' &&
      fav.experienciaLocalId === expId
    );
  };

  const toggleFavorito = async (exp) => {
    if (!userId) return;

    const isFav = isFavorito(exp.id);

    try {
      if (isFav) {
        await api.delete('/favoritos', {
          data: {
            userId,
            experienciaLocalId: exp.id,
            pontoTuristicoId: null
          }
        });
      } else {
        await api.post('/favoritos', {
          userId,
          experienciaLocalId: exp.id,
          pontoTuristicoId: null
        });
      }

      await carregarFavoritos(userId);
    } catch (err) {
      console.log(`Erro ao ${isFav ? 'desfavoritar' : 'favoritar'}:`, err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {experiencias.map((exp) => (
        <View key={exp.id} style={styles.card}>
          <Image
            source={
              exp.nome === 'Praia do Amor'
                ? require('../assets/images/praia-do-amor.jpg')
                : exp.nome === 'Bar do Zé'
                ? require('../assets/images/bar-do-ze.png')
                : require('../assets/images/trilha-morro-mae-luiza.jpeg')
            }
            style={styles.image}
          />
          <Text style={styles.title}>{exp.nome}</Text>
          <Text style={styles.description}>{exp.descricao}</Text>

          <TouchableOpacity
            style={styles.link}
            onPress={() => abrirLocalizacao(exp.latitude, exp.longitude)}
          >
            <Text style={styles.linkText}>Localização</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.favButton, isFavorito(exp.id) ? styles.favorito : styles.naoFavorito]}
            onPress={() => toggleFavorito(exp)}
          >
            <Text style={styles.linkText}>{isFavorito(exp.id) ? 'Desfavoritar' : 'Favoritar'}</Text>
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
  favorito: {
    backgroundColor: 'red',
  },
  naoFavorito: {
    backgroundColor: 'gray',
  },
});

export default ExperienciaLocal;

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const FavoritosScreen = () => {
  const [userId, setUserId] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  const carregarFavoritos = async (idUsuario) => {
    try {
      const response = await api.get(`/favoritos/user/${idUsuario}`);
      setFavoritos(response.data);
    } catch (err) {
      console.log('Erro ao buscar favoritos:', err);
    }
  };

  useEffect(() => {
    const buscarUserIdECarregarFavoritos = async () => {
      const id = await AsyncStorage.getItem('userId');
      if (!id) return;

      setUserId(parseInt(id));
      carregarFavoritos(parseInt(id));
    };

    buscarUserIdECarregarFavoritos();
  }, []);

  const removerFavorito = async (item) => {
    try {
      await api.delete('/favoritos', {
        data: {
          userId: userId,
          pontoTuristicoId: item.pontoTuristicoId,
          experienciaLocalId: item.experienciaLocalId,
        },
      });

      await carregarFavoritos(userId);
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
      Alert.alert('Erro', 'Não foi possível remover o favorito.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Seus Favoritos</Text>

      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text>{item.descricao}</Text>
              <Text style={styles.tipo}>Tipo: {item.tipo}</Text>
            </View>

            <TouchableOpacity
              style={styles.botaoRemover}
              onPress={() => removerFavorito(item)}
            >
              <Text style={styles.botaoTexto}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Você ainda não favoritou nenhum local.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  nome: { fontSize: 18, fontWeight: 'bold' },
  tipo: { fontStyle: 'italic', marginTop: 4 },
  botaoRemover: {
    backgroundColor: '#e63946',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
  vazio: {
    textAlign: 'center',
    marginTop: 40,
    color: '#555',
    fontSize: 16,
  },
});

export default FavoritosScreen;

import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import api from '../services/api';

const Cadastro = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

const handleCadastro = async () => {
  if (!name || !email || !password) {
    Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    return;
  }

  setLoading(true);

  try {
    const response = await api.post('/Auth/register', { name, email, password });

    if (response.status >= 200 && response.status < 300) {
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } else {
      Alert.alert('Erro', 'Erro inesperado ao cadastrar. Tente novamente.');
    }

  } catch (error) {
    console.log('Erro no cadastro:', error.response?.data || error.message);

    if (error.response?.data?.message) {
      Alert.alert('Erro no cadastro', error.response.data.message);
    } else {
      Alert.alert('Erro de conexão', 'Não foi possível se conectar ao servidor.');
    }
  } finally {
    setLoading(false);
  }
};




  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={loading ? 'Carregando...' : 'Cadastrar'}
        onPress={handleCadastro}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default Cadastro;

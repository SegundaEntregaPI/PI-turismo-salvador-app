import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
  const response = await axios.post('http://DESKTOP-EDH81M5:5077/api/Auth/login', {
    email: email,
    password: password,
  });

  if (response.status === 200) {
    Alert.alert('Login realizado com sucesso!');
    navigation.navigate('Home');
  }
} catch (error) {
  if (error.response) {
    if (error.response.status === 401) {
      Alert.alert('Login inválido', 'Email ou senha incorretos.');
    } else {
      Alert.alert('Erro no login', 'Ocorreu um erro ao tentar fazer login. Tente novamente.');
    }
  } else {
    Alert.alert('Erro de conexão', 'Não foi possível se conectar ao servidor.');
  }
} finally {
  setLoading(false);
}
}

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title={loading ? 'Carregando...' : 'Login'}
        onPress={handleLogin}
        disabled={loading}
      />
      
      {/* Texto para navegação para a tela de cadastro */}
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.cadastroText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
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
  cadastroText: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Login;

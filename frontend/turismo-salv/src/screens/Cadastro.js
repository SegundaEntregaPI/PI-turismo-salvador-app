import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios'; // Importando o axios

const Cadastro = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    try {
      // Fazendo a requisição POST ao seu back-end
      const response = await axios.post('http://DESKTOP-EDH81M5:5077/api/Auth/register', {
        name: nome,
        email,
        password: senha  
      });


      // Se o cadastro for bem-sucedido
      if (response.status === 200) {
        Alert.alert('Cadastro realizado com sucesso');
        navigation.goBack();  // Volta para a tela de login
      } else {
        Alert.alert('Erro ao realizar o cadastro');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao realizar o cadastro');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5,
    marginBottom: 15,
  },
});

export default Cadastro;

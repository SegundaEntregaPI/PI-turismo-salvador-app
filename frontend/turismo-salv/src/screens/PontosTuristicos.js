import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native'; 

const PontosTuristicos = () => {
  const abrirLocalizacao = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image 
          source={require('../assets/images/farol-da-barra.jpg')} 
          style={styles.image} 
        />
        <Text style={styles.title}>Farol da Barra</Text>
        <Text style={styles.description}>
          O Farol da Barra é um dos cartões postais de Salvador, localizado na entrada da Baía de Todos os Santos.
        </Text>
        
        
        <TouchableOpacity
          style={styles.link}
          onPress={() => abrirLocalizacao(-13.0025, -38.5203)} 
        >
          <Text style={styles.linkText}>Localização</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Image 
          source={require('../assets/images/elevador-lacerda.jpg')} 
          style={styles.image} 
        />
        <Text style={styles.title}>Elevador Lacerda</Text>
        <Text style={styles.description}>
          O Elevador Lacerda é um dos cartões-postais de Salvador, ligando a cidade baixa à cidade alta desde 1873.
        </Text>

        
        <TouchableOpacity
          style={styles.link}
          onPress={() => abrirLocalizacao(-12.9714, -38.5108)} 
        >
          <Text style={styles.linkText}>Localização</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Image 
          source={require('../assets/images/basilica-bonfim.jpg')} 
          style={styles.image} 
        />
        <Text style={styles.title}>Igreja de Bonfim</Text>
        <Text style={styles.description}>
          A Igreja do Bonfim é um dos principais centros de fé de Salvador, famosa por suas fitas coloridas e orações.
        </Text>

        
        <TouchableOpacity
          style={styles.link}
          onPress={() => abrirLocalizacao(-12.9716, -38.4521)} 
        >
          <Text style={styles.linkText}>Localização</Text>
        </TouchableOpacity>
      </View>
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
});

export default PontosTuristicos;

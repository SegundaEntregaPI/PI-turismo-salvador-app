import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Linking } from 'react-native';

const ExperienciaLocal = () => {
  
  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) => console.error("Erro ao abrir o Google Maps", err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.card}>
        <Image 
          source={require('../assets/images/praia-do-amor.jpg')} 
          style={styles.image} 
        />
        <Text style={styles.title}>Praia do Amor</Text>
        <Text style={styles.description}>
          Uma praia escondida, perfeita para quem busca tranquilidade e uma experiência de surfe. Frequentada apenas por moradores locais.
        </Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => openGoogleMaps(-12.9802, -38.3923)} 
        >
          <Text style={styles.buttonText}>Localização</Text>
        </TouchableOpacity>
      </View>


      
      <View style={styles.card}>
        <Image 
          source={require('../assets/images/bar-do-ze.png')} 
          style={styles.image} 
        />
        <Text style={styles.title}>Bar do Zé</Text>
        <Text style={styles.description}>
          Um bar acolhedor onde os moradores de Itapuã se reúnem para conversar e comer petiscos típicos da Bahia.
        </Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => openGoogleMaps(-12.9061, -38.2841)}
        >
          <Text style={styles.buttonText}>Localização</Text>
        </TouchableOpacity>
      </View>


      
      <View style={styles.card}>
        <Image 
          source={require('../assets/images/trilha-morro-mae-luiza.jpeg')} 
          style={styles.image} 
        />
        <Text style={styles.title}>Trilha do Morro da Mãe Luiza</Text>
        <Text style={styles.description}>
          Uma trilha que leva a um mirante com uma vista espetacular da cidade. Poucos turistas conhecem esse local.
        </Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => openGoogleMaps(-12.9820, -38.4911)} 
        >
          <Text style={styles.buttonText}>Localização</Text>
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
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ExperienciaLocal;

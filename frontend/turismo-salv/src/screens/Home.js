import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const Home = () => {
  const navigation = useNavigation(); 

  return (
    <ImageBackground
      source={require('../assets/images/home.jpg')} 
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Bem-vindo ao Turismo em Salvador!</Text>
        <Text style={styles.subtitle}>Explore os melhores pontos turísticos</Text>

       
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('PontosTuristicos')}
        >
          <Text style={styles.buttonText}>Ver Pontos Turísticos</Text>
        </TouchableOpacity>

        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Eventos')}
        >
          <Text style={styles.buttonText}>Experiência Local</Text>
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

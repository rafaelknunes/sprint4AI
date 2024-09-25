import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Image, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';  // Adicionamos 'Linking'
import TopTabNavigatorNotLogged from './TopTabNavigatorNotLogged';  // Seu Top Tab Navigator
import styles from '../Styles/Index';  // Importa os estilos

const Stack = createNativeStackNavigator();

const MainStack = () => {

  // Define funções para lidar com a navegação para url externa
  const handleButtonA = () => {
    Linking.openURL('https://github.com/rafaelknunes?tab=repositories'); 
  };

    const handleButtonB = () => {
    Linking.openURL('https://www.kaggle.com/code/rafaelknunes/predicting-sales-and-compensations-w-finance-data');  
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        options={{
          // Removemos o título "Minha Aplicação" e o substituímos pelo logo
          headerTitle: () => (
            <Image
              source={require('../../assets/logo.png')}  // Certifique-se de adicionar o caminho correto da sua logo
              style={{ width: 150, height: 40 }}  // Ajuste o tamanho da logo conforme necessário
              resizeMode="contain"  // Para manter a proporção da imagem
            />
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}> {/* Agrupando os botões em linha */}
              <TouchableOpacity 
                onPress={handleButtonA}  // Função para o primeiro botão
                style={styles.button}
              >
                <Text style={styles.buttonText}>GitHub</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleButtonB}  // Função para o segundo botão
                style={[styles.button, { marginLeft: 10 }]}  // Adiciona espaçamento entre os botões
              >
                <Text style={styles.buttonText}>Kaggle</Text>
              </TouchableOpacity>
            </View>
          ),

          headerStyle: {
            backgroundColor: 'black',  // Cor de fundo do header
          },
        }}
      >
        {() => (
          <View style={styles.container}>
            <TopTabNavigatorNotLogged />  {/* Componente de navegação com abas */}
          </View>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};



export default MainStack;

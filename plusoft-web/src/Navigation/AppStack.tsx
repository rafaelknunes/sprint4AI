import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TopTabNavigator from './TopTabNavigator';  // Seu Top Tab Navigator
import { AuthContext } from '../Context/AuthContext';  // Pega o AuthContext para Sign Out
import FeedbackDetailsScreen from '../Components/FeedbackDetailsScreen';  // Sua página de detalhes de feedback

import styles from '../Styles/Index';  // Importa os estilos

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const { signOut } = useContext(AuthContext);  // Função de Sign Out

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
            <TouchableOpacity 
              onPress={() => signOut()}  // Função para deslogar
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: 'black',  // Cor de fundo do header
          },
        }}
      >
        {() => (
          <View style={styles.container}>
            <TopTabNavigator />  {/* Componente de navegação com abas */}
          </View>
        )}
      </Stack.Screen>

      <Stack.Screen
  name="FeedbackDetails"
  component={FeedbackDetailsScreen}
  options={{ title: 'Detalhes do Feedback' }}
/>

    </Stack.Navigator>
  );
};



export default AppStack;

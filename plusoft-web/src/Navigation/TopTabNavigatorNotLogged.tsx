import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet } from 'react-native';
import Login from '../Components/Login';
import Cadastro from '../Components/Cadastro';
import Footer from '../Components/Footer';  // Importando o rodapé
import styles from '../Styles/Index';

const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigatorNotLogged() {
  return (
    <View style={styles.footContainer}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: styles.tabBarLabel,  // Usando o estilo do arquivo de estilos
          tabBarStyle: styles.tabBar,  // Usando o estilo do arquivo de estilos
          tabBarIndicatorStyle: styles.tabBarIndicator,  // Usando o estilo do arquivo de estilos
        }}
      >
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Cadastro" component={Cadastro} />
      </Tab.Navigator>

      <Footer />
    </View>
  );
}


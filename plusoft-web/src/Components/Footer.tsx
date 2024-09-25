import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../Styles/Index';  // Importando os estilos

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>© 2024 HAL9000. Todos os direitos reservados.</Text>
    </View>
  );
};


export default Footer;

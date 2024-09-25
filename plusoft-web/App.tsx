import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Index from './src/Components/Main';  // Componente principal
import { AuthProvider } from './src/Context/AuthContext';  // Provedor de autenticação

process.env.URL 

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Index />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;

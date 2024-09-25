import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Linking, CheckBox } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../Context/AuthContext";
import { AuthNavigation } from "../Types/Stack";
import styles from '../Styles/Index';

const Login = () => {

  const [acceptTerms, setAcceptTerms] = useState<boolean>(true); // Estado para o checkbox
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signIn, userEmail } = useContext(AuthContext);
  const navigation = useNavigation<AuthNavigation>();
  const [error, setError] = useState<string>("");

  // Função de autenticação
  const doAuth = async () => {
    try {
      await signIn(email, password);
      setError(""); // Limpa erro em caso de sucesso
    } catch (error) { 
      setError("Erro ao logar"); 
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput 
        style={styles.input} 
        onChangeText={setEmail} 
        value={email}
        placeholder="Digite seu email"
      />
      
      <Text>Senha</Text>
      <TextInput 
        style={styles.input} 
        secureTextEntry 
        onChangeText={setPassword} 
        value={password}
        placeholder="Digite sua senha"
      />

      {/* CheckBox para aceitar os termos */}
      <View style={styles.checkboxContainer}>
        <CheckBox 
          value={acceptTerms} 
          onValueChange={setAcceptTerms} 
        />
        <Text > Aceito os </Text>
        <Text style={styles.hyperlink} onPress={() => Linking.openURL('https://www.gov.br/esporte/pt-br/acesso-a-informacao/lgpd')}>
            termos e condições
        </Text>
      </View>

      {/* Desabilitar o botão de login se os termos não forem aceitos */}
      <Button 
        title="Logar" 
        onPress={doAuth} 
        disabled={!acceptTerms} // Botão desabilitado se os termos não forem aceitos
      />

      {/* Exibir mensagem de erro dentro de um box vermelho */}
      {error ? (
        <View style={[styles.messageBox, styles.errorBox]}>
          <Text style={styles.messageText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default Login;

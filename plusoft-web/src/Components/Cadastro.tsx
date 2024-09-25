import React, { useContext, useState } from "react";
import { Text, View, Button, TextInput, Linking, CheckBox} from "react-native"; 
import { Picker } from "@react-native-picker/picker"; 
import { AuthContext } from "../Context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigation } from "../Types/Stack";
import styles from '../Styles/Index';

const Cadastro = () => {
  const [acceptTerms, setAcceptTerms] = useState<boolean>(true); // Estado para o checkbox

  const navigation = useNavigation<AuthNavigation>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { register } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState<string>("false"); // Estado para armazenar a seleção do dropdown (admin)

  // Função para criar o usuário
  const createUser = async () => {
    setError("");
    if (password !== confirmPassword) {
      setError("Senhas não são iguais");
      return;
    }

    // A função register agora inclui a chamada para o backend
    try {
      await register(email, password); 
      setError("");
    } catch (error) {
      setError("Erro ao registrar");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput style={styles.input} onChangeText={setEmail} value={email} />

      <Text>Senha</Text>
      <TextInput style={styles.input} secureTextEntry onChangeText={setPassword} value={password} />

      <Text>Confirmar Senha</Text>
      <TextInput style={styles.input} secureTextEntry onChangeText={setConfirmPassword} value={confirmPassword} />

{/*
      <Text>Admin</Text>
      ---- Dropdown para selecionar se o usuário é admin -----
      <Picker
        selectedValue={isAdmin}
        style={styles.input} // Reutilizando estilo do input
        onValueChange={(itemValue, itemIndex) => setIsAdmin(itemValue)}
      >
        <Picker.Item label="Usuário" value="false" />
        <Picker.Item label="Administrador" value="true" />
      </Picker>
*/}

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
        title="Cadastrar" 
        onPress={createUser} 
        disabled={!acceptTerms} // Botão desabilitado se os termos não forem aceitos
      />

      {/* Exibir mensagem de erro, se houver */}
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
    </View>
  );
};

export default Cadastro;

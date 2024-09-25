import { API_BASE_URL } from '../../config'; 
import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button } from "react-native"; 
import { Picker } from "@react-native-picker/picker"; 
import { AuthContext } from "../Context/AuthContext";
import { analyzeSentiment } from "../Services/sentimentService"; 
import styles from '../Styles/Index';

const Home = () => {
  const { userEmail } = useContext(AuthContext); // Email do usuário logado
  const [content, setContent] = useState<string>("");
  const [issue, setIssue] = useState<string>(""); // Dropdown para issue
  const [product, setProduct] = useState<string>(""); // Dropdown para product
  const [company, setCompany] = useState<string>(""); // Dropdown para company
  const [message, setMessage] = useState<string | null>(null); // Estado para a mensagem de sucesso ou erro
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null); // Tipo da mensagem
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para o botão de enviar

  const postFeedback = async () => {
    // Desabilitar o botão após clicar
    setIsSubmitting(true);

    // Primeiro, chamamos a função de análise de sentimento
    const sentiment = await analyzeSentiment(content, issue);
  
    // Verifique se o sentimento é um número válido; se não for, defina como 0
    const sentimentValue = isNaN(parseFloat(sentiment ?? "")) ? 0 : parseFloat(sentiment ?? "");

    const feedbackData = {
      userEmail: userEmail, 
      createdAt: new Date().toISOString(), 
      dateLastUpdated: new Date().toISOString(), 
      content: content, 
      issue: issue, 
      product: product, 
      company: company,
      saleStatus: "pendente", 
      sentiment: sentimentValue
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/Feedbacks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Pegar a resposta do erro como texto
        console.error(`Erro ao enviar feedback: ${response.status} - ${response.statusText}`);
        console.error(`Detalhes do erro: ${errorText}`);
        throw new Error(`Erro ao enviar feedback: ${response.statusText}`);
      }

      setMessage("Feedback enviado com sucesso!");
      setMessageType("success");

      // Limpar os campos após o envio
      setContent("");
      setIssue("");
      setProduct("");
      setCompany("");

      // Fazer a mensagem desaparecer após 3 segundos
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
        setIsSubmitting(false); // Reativar o botão após 3 segundos
      }, 3000);

    } catch (error) {
      console.error("Erro ao enviar feedback:", error); // Detalhe do erro
      setMessage("Erro ao enviar feedback. Verifique o console para mais detalhes.");
      setMessageType("error");

      // Fazer a mensagem desaparecer após 3 segundos
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
        setIsSubmitting(false); // Reativar o botão após o erro
      }, 3000);
    }
  };

  // O botão só estará habilitado se todos os campos necessários forem preenchidos
  const isFormValid = company && issue && product && !isSubmitting;

  return (
    <View style={styles.container}>
      {/* Exibição do nome do usuário logado */}
      <Text style={styles.label}>Logado como: {userEmail}</Text>
  
      {/* Dropdown para issue */}
      <Picker
        selectedValue={issue}
        onValueChange={(itemValue) => setIssue(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma categoria" value="" />
        <Picker.Item label="Dúvida" value="Dúvida" />
        <Picker.Item label="Elogio" value="Elogio" />
        <Picker.Item label="Reclamação" value="Reclamação" />
      </Picker>
  
      {/* Dropdown para produto */}
      <Picker
        selectedValue={product}
        onValueChange={(itemValue) => setProduct(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione um produto" value="" />
        <Picker.Item label="Fraude e Segurança" value="fraude-e-seguranca" />
        <Picker.Item label="Problemas de Pagamento" value="problemas-de-pagamento" />
        <Picker.Item label="Crédito e Empréstimos" value="credito-e-emprestimos" />
        <Picker.Item label="Faturamento e Débitos" value="faturamento-e-debitos" />
        <Picker.Item label="Atendimento ao Cliente" value="atendimento-ao-cliente" />
        <Picker.Item label="Problemas de Conta Bancária" value="problemas-de-conta-bancaria" />
        <Picker.Item label="Cartões de Crédito" value="cartoes-de-credito" />
        <Picker.Item label="Investimentos" value="investimentos" />
        <Picker.Item label="Seguros" value="seguros" />
        <Picker.Item label="Problemas Técnicos em Serviços Online" value="problemas-tecnicos-em-servicos-online" />
      </Picker>
  
      {/* Dropdown para company */}
      <Picker
        selectedValue={company}
        onValueChange={(itemValue) => setCompany(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma empresa" value="" />
        <Picker.Item label="Afinz" value="Afinz" />
        <Picker.Item label="Alelo" value="Alelo" />
        <Picker.Item label="Credi" value="Credi" />
        <Picker.Item label="Itau" value="Itau" />
        <Picker.Item label="Omni" value="Omni" />
        <Picker.Item label="Rabobank" value="Rabobank" />
        <Picker.Item label="Trigg" value="Trigg" />
        <Picker.Item label="Western Union" value="Western Union" />
        <Picker.Item label="BMG" value="BMG" />
      </Picker>
  
      {/* Input de conteúdo */}
      <TextInput
        style={styles.inputStyled}
        value={content}
        onChangeText={setContent}
        placeholder="Comentários"
        multiline
      />
  
      {/* Botão para enviar feedback */}
      <Button title="Enviar" onPress={postFeedback} disabled={!isFormValid} />
  
      {/* Exibir mensagem de sucesso ou erro */}
      {message && (
        <View style={[styles.messageBox, messageType === 'success' ? styles.successBox : styles.errorBox]}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}
    </View>
  );
};

export default Home;

import { API_BASE_URL } from '../../config'; 
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native'; 
import { FontAwesome } from '@expo/vector-icons'; 
import styles from '../Styles/Index'; 
import { salesPrediction } from '../Services/salesService'; 

// Função para formatar a resposta da OpenAI
const formatResponse = (response: string) => {
  try {
    const lines = response.split('\n').map(line => line.trim());
    if (lines.length >= 4) {
      const categoria = lines[0].replace('1. ', '').trim();
      const produto = lines[1].replace('2. ', '').trim();
      const receita = lines[2].replace('3. ', '').trim();
      const explicacao = lines[3].replace('4. ', '').trim();

      return {
        categoria,
        produto,
        receita: receita.replace('R$', '').trim(), // Remove o símbolo de R$ da receita
        explicacao
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao formatar resposta:", error);
    return null;
  }
};

// Função para atualizar o feedback via API
const updateFeedback = async (feedbackId: string, saleCategory: string, saleSuggestion: string, saleValue: string, saleReasoning: string) => {
  const requestBody = {
    "feedbackId": feedbackId,
    "saleCategory": saleCategory,
    "saleSuggestion": saleSuggestion,
    "saleValue": parseFloat(saleValue), // Converte a receita para número
    "saleReasoning": saleReasoning,
    "saleStatus": "processando"
  };

  console.log('Corpo da requisição enviado para a API:', requestBody);

  try {
    const response = await fetch(`${API_BASE_URL}/api/Feedbacks/${feedbackId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Resposta da API:', response);

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error(`Erro ao atualizar feedback: ${response.statusText}. Detalhes: ${errorDetails}`);
      throw new Error(`Erro ao atualizar feedback: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('Dados retornados pela API:', responseData);

    return responseData;
  } catch (error) {
    console.error('Erro ao atualizar o feedback:', error);
    return null;
  }
};

const FeedbackDetailsScreen = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const route = useRoute(); 
  const { userEmail } = route.params; 

  useEffect(() => {
    const fetchUserFeedbacks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/Feedbacks/user/${userEmail}`);
        const data = await response.json();
        console.log('Feedbacks recebidos:', data);
        setFeedbacks(data);
      } catch (error) {
        console.error('Erro ao buscar feedbacks do usuário:', error);
      }
    };

    fetchUserFeedbacks();
  }, [userEmail]);

  // Função para renderizar o ícone de sentimento
  const renderSentimentIcon = (sentiment: number) => {
    let color = sentiment > 0 ? 'green' : 'red';
    let iconName = sentiment > 0 ? 'smile-o' : 'frown-o';

    return (
      <FontAwesome name={iconName} size={24} color={color} />
    );
  };

  // Função para buscar a previsão da OpenAI e atualizar o feedback
  const fetchSalesPrediction = async (text: string, issue: string, company: string, feedbackId: string) => {
    setLoading(true);
    try {
      const result = await salesPrediction(text, issue, company);
      console.log("Previsão de vendas:", result);
      if (result) {
        const formattedResult = formatResponse(result);

        if (formattedResult) {
          // Atualiza o feedback via API
          const updatedFeedback = await updateFeedback(
            feedbackId,
            formattedResult.categoria,
            formattedResult.produto,
            formattedResult.receita,
            formattedResult.explicacao
          );

          console.log("Feedback atualizado:", updatedFeedback);
          
          // Atualiza o estado com o texto formatado
          setPrediction(`
            1. Categoria: ${formattedResult.categoria}
            2. Serviço/Produto: ${formattedResult.produto}
            3. Receita Estimada: R$ ${formattedResult.receita}
            4. Explicação: ${formattedResult.explicacao}
          `);
        } else {
          setPrediction("Erro ao formatar a resposta da OpenAI.");
        }
      } else {
        setPrediction("Erro ao obter as informações de vendas.");
      }
    } catch (error) {
      console.error("Erro ao obter a previsão:", error);
      setPrediction("Erro ao obter as informações de vendas.");
    } finally {
      setLoading(false);
    }
  };

  // Função para alternar a exibição de mais detalhes
  const toggleExpand = (index: number, text: string, issue: string, company: string, feedbackId: string) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
      setPrediction(null); // Resetar a previsão quando o detalhe é fechado
    } else {
      setExpandedIndex(index);
      fetchSalesPrediction(text, issue, company, feedbackId); // Chama a API quando o item é expandido
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.feedbackItem}>
      <View style={styles.contentContainer}>
        <View style={{flex:1, flexWrap:"wrap"}}>
          <Text style={styles.label}>Data de Criação: <Text style={styles.value}>{new Date(item.createdAt).toLocaleDateString()}</Text></Text>
          <Text style={styles.label}>Usuário: <Text style={styles.value}>{item.userEmail}</Text></Text>
          <Text style={styles.label}>Categoria: <Text style={styles.value}>{item.issue}</Text></Text>
          <Text style={styles.label}>Produto: <Text style={styles.value}>{item.product}</Text></Text>
          <Text style={styles.label}>Empresa: <Text style={styles.value}>{item.company}</Text></Text>
          <Text style={styles.label}>Conteúdo: <Text style={styles.value}>{item.content}</Text></Text>

          {/* Verifica o status do feedback */}
          {item.saleStatus === 'pendente' ? (
            <Button 
              title={expandedIndex === index ? "Ocultar recomendações" : "Acionar IA para recomendações"}
              onPress={() => toggleExpand(index, item.content, item.issue, item.company, item.feedbackId)}
            />
          ) : (
            <View style={{flex:1, flexWrap:"wrap"}}>
              <Text style={[ styles.messageText]}>
                1. Categoria: {item.saleCategory}
                {"\n"}2. Serviço/Produto: {item.saleSuggestion}
                {"\n"}3. Receita Estimada: R$ {item.saleValue}
                {"\n"}4. Explicação: {item.saleReasoning}
              </Text>
            </View>
          )}
        </View>

        {/* Ícone de Sentimento na lateral direita */}
        <View style={styles.sentimentContainer}>
          {renderSentimentIcon(parseFloat(item.sentiment))}
          <Text style={[styles.sentimentText, { color: parseFloat(item.sentiment) > 0 ? 'green' : 'red' }]}>
            {item.sentiment}
          </Text>
        </View>
      </View>

      {/* Exibir mais detalhes se o índice do feedback for o expandido */}
      {expandedIndex === index && (
        <View style={[styles.successBox, styles.container]}>
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Text style={styles.messageText}>
              {prediction ? prediction : "Nenhuma previsão disponível."}
            </Text>
          )}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de: {userEmail}</Text>
      <FlatList
        data={feedbacks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default FeedbackDetailsScreen;

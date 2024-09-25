import { API_BASE_URL } from '../../config'; 
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; 
import styles from '../Styles/Index';

const FeedbackScreen = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Página atual
  const [hasMore, setHasMore] = useState(true); // Indica se há mais dados a serem carregados
  const navigation = useNavigation();
  const pageSize = 10; // Tamanho da página (quantidade de feedbacks por vez)

  const fetchFeedbacks = async (pageNumber) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/Feedbacks?page=${pageNumber}&limit=${pageSize}`);
      const data = await response.json();

      if (data.length < pageSize) {
        setHasMore(false); // Se os dados retornados forem menores que o tamanho da página, não há mais dados
      }

      setFeedbacks(prevFeedbacks => [...prevFeedbacks, ...data]); // Adiciona os novos feedbacks à lista existente
      setPage(pageNumber + 1); // Incrementa a página
    } catch (error) {
      console.error('Erro ao buscar feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setFeedbacks([]); // Limpa os feedbacks ao focar na tela
      setPage(1); // Reseta a página para 1
      setHasMore(true); // Reseta o estado de "mais dados disponíveis"
      fetchFeedbacks(1); // Carrega a primeira página de feedbacks
    }, [])
  );

  // Função para renderizar o ícone de sentimento
  const renderSentimentIcon = (sentiment) => {
    let color = sentiment > 0 ? 'green' : 'red';
    let iconName = sentiment > 0 ? 'smile-o' : 'frown-o';

    return (
      <FontAwesome name={iconName} size={24} color={color} />
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.feedbackItem}>
      <View style={styles.contentContainer}>
        <View style={{flex:1, flexWrap:"wrap"}}>
          <Text style={styles.label}>Data de Criação: <Text style={styles.value}>{new Date(item.createdAt).toLocaleDateString()}</Text></Text>
          <Text style={styles.label}>Usuário: <Text style={styles.value}>{item.userEmail}</Text></Text>
          <Text style={styles.label}>Categoria: <Text style={styles.value}>{item.issue}</Text></Text>
          <Text style={styles.label}>Produto: <Text style={styles.value}>{item.product}</Text></Text>
          <Text style={styles.label}>Empresa: <Text style={styles.value}>{item.company}</Text></Text>
          <Text style={styles.label}>Conteúdo: <Text style={styles.value}>{item.content}</Text></Text>
        </View>

        {/* Ícone de Sentimento */}
        <View style={styles.sentimentContainer}>
          {renderSentimentIcon(parseFloat(item.sentiment))}
          <Text style={[styles.sentimentText, { color: parseFloat(item.sentiment) > 0 ? 'green' : 'red' }]}>
            {item.sentiment}
          </Text>
        </View>
      </View>

      <Button 
        title="Ver histórico do usuário"
        onPress={() => navigation.navigate('FeedbackDetails', { userEmail: item.userEmail })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={feedbacks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

    {hasMore && !loading && (
      <Button 
        title="Carregar mais" 
        onPress={() => fetchFeedbacks(page)} 
        color="#FF4500" // Cor diferente para o botão "Carregar mais"
      />
    )}


      {/* Indicador de loading enquanto carrega mais feedbacks */}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

export default FeedbackScreen;

import { OPENAI_API_KEY } from '../../config'; // Importa a chave da API

export const analyzeSentiment = async (text: string, issue: string): Promise<string | null> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4", // ou "gpt-4-turbo" dependendo do plano
        messages: [
          {
            role: "system",
            content:  "As an AI with expertise in language and emotion analysis, your task is to analyze the sentiment of the following text, which is a complaint against a financial institution. Please focus on the customer's emotions and attitudes toward the company, taking into account the overall tone of the discussion, the language used, and the context in which words and phrases are used. Return only the number. For example: '-1', '0.4', etc."
          },
          {
            role: "user",
            content: `Analyze the sentiment of the following text which is a ${issue}:\n\n${text}\n\nReturn the score, from -1 to 1. Return only the number. For example: '-1', '0.4', etc.`
          }
        ],
        temperature: 0
      })
    });

    const data = await response.json();

    if (data && data.choices && data.choices.length > 0 && data.choices[0].message) {
      const sentiment = data.choices[0].message.content.trim();
      return sentiment;
    } else {
      throw new Error("Resposta inesperada da API.");
    }

  } catch (error) {
    console.error('Erro ao analisar sentimento:', error);
    return null;
  }
};

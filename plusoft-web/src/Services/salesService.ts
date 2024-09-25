import { OPENAI_API_KEY } from '../../config';

export const salesPrediction = async (text: string, issue: string, company: string): Promise<string | null> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:  "You are an AI assistant specializing in analyzing customer complaints, compliments or questions against financial institutions. Your goal is to accurately categorize each complaint into one of the predefined financial service categories and suggest the most appropriate product or service the customer might be interested in purchasing."
          },
          {
            role: "user",
            content: `
              Financial institution's name: ${company}
              Issue: ${issue}
              Text: ${text}

              Based on these details, return a list separated by commas:
              1. The most relevant category.
              2. The most relevant product/service.
              3. The estimated potential annual revenue (in Brazilian Reais BRL). The number must be always bigger than 100 and less than 10000. Do not use decimal points. Only integers.
              4. A brief explanation. Maximum 150 tokens.

              Importante: The answer should be in Portuguese (Brazil).
            `
          }
        ],
        temperature: 0,
      })
    });

    const data = await response.json();
    console.log("Resposta da API:", data);

    if (data && data.choices && data.choices.length > 0 && data.choices[0].message) {
      const sentiment = data.choices[0].message.content.trim();
      return sentiment;
    } else {
      console.error("Dados inesperados da API:", data);
      return "Erro: Formato inesperado da resposta.";
    }

  } catch (error) {
    console.error('Erro ao prever vendas:', error);
    return "Erro ao prever vendas.";
  }
};


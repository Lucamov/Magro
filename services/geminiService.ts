import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

if (process.env.API_KEY) {
  aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const getAiCoachAdvice = async (exerciseName: string): Promise<string> => {
  if (!aiClient) {
    return "Configuração da IA não encontrada. Por favor verifique sua chave de API.";
  }

  try {
    const prompt = `
      Você é um personal trainer de elite, especialista em biomecânica.
      O aluno está prestes a fazer o exercício: "${exerciseName}".
      
      Por favor, forneça:
      1. Uma explicação muito breve e direta de como executar corretamente (máximo 2 frases).
      2. Uma "Dica de Ouro" para evitar lesões ou melhorar a ativação muscular.
      
      Mantenha o tom motivador e curto. Não use markdown complexo, apenas texto simples e parágrafos.
    `;

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Não foi possível obter a dica agora. Tente novamente.";
  } catch (error) {
    console.error("Erro ao consultar o Gemini:", error);
    return "Ocorreu um erro ao conectar com seu treinador virtual.";
  }
};

export const simulateBodyProgress = async (base64Image: string, timeframe: '3_MONTHS' | '1_YEAR'): Promise<string | null> => {
  if (!aiClient) {
    throw new Error("API Key missing");
  }

  try {
    // Remove header from base64 string if present
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const intensity = timeframe === '3_MONTHS' 
      ? "noticeable but realistic muscle definition, slight hypertrophy, and athletic toning" 
      : "significant muscle hypertrophy, impressive body composition, broad shoulders, and defined abs";

    const prompt = `Edit this photo to simulate fitness progress for a gym tracking app. 
    The goal is to show the person with ${intensity}. 
    Keep the face, hair, lighting, clothing color, and background EXACTLY the same. 
    Only modify the body physique to look fitter, stronger, and more muscular suited for a natural bodybuilder.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: 'image/jpeg',
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    // Iterate to find the image part
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Erro na simulação de imagem:", error);
    throw error;
  }
};
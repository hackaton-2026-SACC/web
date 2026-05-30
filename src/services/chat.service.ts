/**
 * chat.service.ts
 *
 * Camada de serviço para o chat contextual.
 * Atualmente retorna respostas mockadas com correspondência por palavras-chave.
 *
 * Exemplo de migração futura para LLM:
 *   import axios from 'axios';
 *   export const getChatResponse = (message: string, cityId?: string | null) =>
 *     axios.post(`${BASE_URL}/chat`, { message, cityId }).then(r => r.data.response);
 */

import { getMockChatResponse } from '../mocks/chatMock';
import type { ChatMessage } from '../types';

/**
 * Envia uma mensagem e retorna a resposta do assistente.
 * @param message - Mensagem do usuário
 * @param cityId - ID da cidade selecionada (null = contexto estadual)
 * @param cityName - Nome do contexto atual para exibição
 */
export const getChatResponse = async (
  message: string,
  cityId: string | null,
  cityName: string,
): Promise<string> => {
  // Simula latência de processamento do LLM
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

  return getMockChatResponse(message, cityId, cityName);
};

/**
 * Cria uma nova mensagem tipada para o histórico do chat.
 */
export const createMessage = (
  role: ChatMessage['role'],
  content: string,
): ChatMessage => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  role,
  content,
  timestamp: new Date(),
});

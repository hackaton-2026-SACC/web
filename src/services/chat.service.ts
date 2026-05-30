/**
 * chat.service.ts
 *
 * Camada de serviço para o chat contextual.
 * Chama o endpoint real em https://chat-production-487e.up.railway.app/chat
 *
 * Contrato da API:
 *   POST /chat
 *   Body:  { request_id: string, text: string }
 *   200:   { request_id: string, response: string }
 */

import axios from 'axios';
import type { ChatMessage } from '../types';

const API_BASE = (import.meta.env.VITE_CHAT_URL as string | undefined) ?? 'https://chat-licitacao.up.railway.app/';

const chatApi = axios.create({
  baseURL: API_BASE,
  timeout: 30_000, // 30s — LLMs podem demorar
  headers: { 'Content-Type': 'application/json' },
});

interface ChatRequest {
  request_id: string;
  text: string;
}

interface ChatApiResponse {
  request_id: string;
  response: string;
}

/**
 * Monta o texto completo enviado ao backend, incluindo o contexto
 * de cidade/estado para que o LLM responda de forma contextualizada.
 */
const buildContextualText = (
  message: string,
  cityName: string,
): string => {
  return `[Contexto cidade/estado da PB: ${cityName}]\n\n${message}`;
};

/**
 * Envia uma mensagem ao backend e retorna a resposta do LLM.
 *
 * @param sessionId - UUID da sessão do usuário (persistido por browser)
 * @param message   - Texto digitado pelo usuário
 * @param cityName  - Nome do contexto atual (cidade ou "Estado da Paraíba")
 */
export const getChatResponse = async (
  sessionId: string,
  message: string,
  cityName: string,
): Promise<string> => {
  const body: ChatRequest = {
    request_id: sessionId,
    text: buildContextualText(message, cityName),
  };

  const { data } = await chatApi.post<ChatApiResponse>('/chat', body);
  return data.response;
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

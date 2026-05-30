/**
 * useSessionId.ts
 *
 * Gera um UUID v4 único por sessão de navegador e persiste no localStorage.
 * O mesmo UUID é reutilizado em todas as mensagens da mesma sessão.
 */
import { useRef } from 'react';

const STORAGE_KEY = 'observapb_session_id';

const generateUUID = (): string => {
  // Usa crypto.randomUUID() se disponível (Chrome 92+, Firefox 95+)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback manual
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const getOrCreateSessionId = (): string => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    const newId = generateUUID();
    localStorage.setItem(STORAGE_KEY, newId);
    return newId;
  } catch {
    // localStorage indisponível (modo privado em alguns browsers)
    return generateUUID();
  }
};

/**
 * Hook que retorna sempre o mesmo session ID para este browser/aba.
 * O valor nunca muda durante a vida do componente.
 */
export const useSessionId = (): string => {
  const idRef = useRef<string | null>(null);
  if (!idRef.current) {
    idRef.current = getOrCreateSessionId();
  }
  return idRef.current;
};

import React, { useState, useRef, useEffect } from "react";
import { Send, User, Bot, WifiOff } from "lucide-react";
import { useAppContext } from "../hooks/useAppContext";
import { useSessionId } from "../hooks/useSessionId";
import { getChatResponse, createMessage } from "../services/chat.service";
import type { ChatMessage } from "../types";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Olá! Sou o assistente do Observatório de Contratações Públicas da Paraíba. Posso responder perguntas sobre contratos, anomalias, fornecedores e categorias. Selecione um município no mapa para análises mais específicas.",
    timestamp: new Date(),
  },
];

const formatTime = (d: Date) =>
  d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

const MarkdownText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-amber-300">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
};

const QUICK_QUESTIONS = [
  "Qual é o maior contrato de João Pessoa?"
];

const ChatContextual: React.FC = () => {
  const { selectedCity } = useAppContext();
  const sessionId = useSessionId();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevCityRef = useRef<string | null>(null);

  // Scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const currentId = selectedCity?.id ?? null;
    if (prevCityRef.current === currentId) return;
    prevCityRef.current = currentId;
    if (messages.length > 1) {
      setMessages((prev) => [
        ...prev,
        createMessage(
          "assistant",
          `Contexto atualizado para **${selectedCity ? selectedCity.name : "Estado da Paraíba"}**. Pode perguntar sobre este contexto.`,
        ),
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;
    setCollapsed(false);
    setError(null);
    setMessages((prev) => [...prev, createMessage("user", text)]);
    setInput("");
    setIsTyping(true);
    try {
      const cityName = selectedCity?.name ?? "Estado da Paraíba";
      const resp = await getChatResponse(sessionId, text, cityName);
      setMessages((prev) => [...prev, createMessage("assistant", resp)]);
    } catch (err) {
      console.error("[Chat] Erro na requisição:", err);
      setError("Não foi possível conectar ao assistente. Verifique sua conexão e tente novamente.");
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  return (
    <section className="bg-white rounded-lg flex flex-col overflow-hidden">

      <div
        className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-gray-100 bg-white flex-shrink-0 cursor-pointer select-none"
        onClick={() => setCollapsed((c) => !c)}
        role="button"
        aria-expanded={!collapsed}
        aria-label="Alternar chat"
      >
        <div className="flex items-center gap-2">
          <div className="text-[12px] sm:text-[13px] text-gray-500">
            Conversando sobre: <span className="font-semibold text-blue-600">
              {selectedCity ? selectedCity.name : "Estado da Paraíba"}
            </span>
          </div>
        </div>
      </div>

      {!collapsed && (
        <>
          <div className="px-3 sm:px-4 py-2.5 flex gap-2 border-b border-gray-100 flex-shrink-0 overflow-x-auto scrollbar-none">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={(e) => {
                  e.stopPropagation();
                  setInput(q);
                  inputRef.current?.focus();
                }}
                className="bg-gray-50 border border-gray-200 text-gray-600 rounded-full px-3 sm:px-3.5 py-1.5 text-[11px] sm:text-[12px] font-medium whitespace-nowrap flex-shrink-0 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 active:scale-95 transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Erro de rede */}
          {error && (
            <div className="mx-3 sm:mx-4 mt-2 flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg text-[12px] text-red-700">
              <WifiOff size={14} className="flex-shrink-0" />
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-400 hover:text-red-600 text-[11px] underline flex-shrink-0"
              >
                Fechar
              </button>
            </div>
          )}

          {/* Messages */}
          <div className="overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 flex flex-col gap-3 sm:gap-3.5 min-h-[160px] max-h-[260px] sm:max-h-[340px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 sm:gap-2.5 items-end ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white border-blue-700"
                      : "bg-gray-100 text-gray-500 border-gray-200"
                  }`}
                >
                  {msg.role === "user" ? <User size={13} /> : <Bot size={13} />}
                </div>

                <div
                  className={`flex flex-col gap-0.5 max-w-[80%] sm:max-w-[72%] ${
                    msg.role === "user" ? "items-end" : ""
                  }`}
                >
                  <div
                    className={`px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl text-[12px] sm:text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-gray-100 border border-gray-200 text-gray-900 rounded-bl-sm"
                    }`}
                  >
                    <MarkdownText text={msg.content} />
                  </div>
                  <span className="text-[10px] text-gray-400 px-1">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2 sm:gap-2.5 items-end">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <Bot size={13} className="text-gray-500" />
                </div>
                <div className="bg-gray-100 border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-[bounce-dot_1.2s_infinite]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-[bounce-dot_1.2s_0.2s_infinite]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-[bounce-dot_1.2s_0.4s_infinite]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-gray-100 flex gap-2 sm:gap-2.5 flex-shrink-0 bg-white">
            <input
              ref={inputRef}
              id="chat-input"
              type="text"
              placeholder={`Pergunte sobre ${selectedCity ? selectedCity.name : "a Paraíba"}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isTyping}
              className="flex-1 min-w-0 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 sm:py-2.5 text-[13px] text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all disabled:opacity-60"
            />
            <button
              id="chat-send-btn"
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              aria-label="Enviar mensagem"
              className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 hover:shadow-md active:scale-95 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <Send size={15} />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default ChatContextual;

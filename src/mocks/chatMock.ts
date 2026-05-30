export interface MockChatEntry {
  keywords: string[];
  response: string;
}

export const CHAT_RESPONSES_GERAL: MockChatEntry[] = [
  {
    keywords: ['anomalia', 'anomalias', 'irregular'],
    response:
      'No estado da Paraíba, foram identificadas **312 anomalias** no período analisado. Pavimentação concentra o maior número, com padrões suspeitos de superfaturamento em contratos acima de R$ 1M.',
  },
  {
    keywords: ['categoria', 'categorias', 'área'],
    response:
      'As categorias com mais contratos no estado são: **Pavimentação (38%)**, Saúde (24%), Educação (18%), Tecnologia (12%) e Vestuário (8%). Pavimentação lidera tanto em volume quanto em valor.',
  },
  {
    keywords: ['fornecedor', 'fornecedores', 'empresa'],
    response:
      'Os fornecedores mais recorrentes no estado são a **Construtora Nordeste S.A.** (412 contratos), MedSupply Brasil (287), TechGov Sistemas (198) e EduMat Distribuições (154).',
  },
  {
    keywords: ['valor', 'gastos', 'despesas', 'investimento'],
    response:
      'O valor total contratado no estado atingiu **R$ 4,78 bilhões** no período. Os maiores gastos estão em pavimentação e saúde, que juntos representam 62% do total.',
  },
  {
    keywords: ['crescimento', 'aumento', 'evolução', 'tendência'],
    response:
      'Há um crescimento de **23% nos gastos com infraestrutura** em relação ao ano anterior. O mês de setembro registrou o pico de contratos (2.100), seguido de novembro (2.240).',
  },
  {
    keywords: ['cidade', 'município', 'região'],
    response:
      'João Pessoa concentra **26% dos contratos** do estado, seguida por Campina Grande (15%) e Patos (6%). Clique em um município no mapa para ver dados detalhados.',
  },
];

export const CHAT_RESPONSES_CIDADE: Record<string, MockChatEntry[]> = {
  'joao-pessoa': [
    {
      keywords: ['anomalia', 'anomalias', 'irregular'],
      response:
        'Em João Pessoa foram identificadas **87 anomalias**. A maioria está concentrada em contratos de saúde, especialmente em aquisições de medicamentos e equipamentos hospitalares.',
    },
    {
      keywords: ['categoria', 'categorias', 'área'],
      response:
        'Em João Pessoa, **Saúde lidera com 42%** dos contratos, seguida por Educação (22%), Pavimentação (18%), Tecnologia (11%) e Vestuário (7%).',
    },
    {
      keywords: ['fornecedor', 'fornecedores', 'empresa'],
      response:
        'O principal fornecedor em João Pessoa é a **MedSupply Brasil Ltda.** com 210 contratos. Há 3 contratos acima de R$ 10M desta empresa em análise por suspeita de sobrepreço.',
    },
    {
      keywords: ['valor', 'gastos', 'despesas'],
      response:
        'João Pessoa contratou **R$ 1,23 bilhão** no período. Saúde responde por aproximadamente R$ 516 milhões desse total.',
    },
  ],
  'campina-grande': [
    {
      keywords: ['anomalia', 'anomalias', 'irregular'],
      response:
        'Em Campina Grande foram detectadas **54 anomalias**, concentradas principalmente em contratos de tecnologia da informação, onde a TechGov Sistemas venceu 18 de 25 licitações.',
    },
    {
      keywords: ['categoria', 'categorias', 'área'],
      response:
        'Em Campina Grande, **Tecnologia lidera com 35%**, seguida por Educação (28%), Saúde (20%), Pavimentação (12%) e Vestuário (5%).',
    },
    {
      keywords: ['fornecedor', 'fornecedores', 'empresa'],
      response:
        'O principal fornecedor em Campina Grande é a **TechGov Sistemas Ltda.** com 187 contratos de TI. Alta concentração: top 2 fornecedores respondem por 56% do valor total.',
    },
  ],
  'patos': [
    {
      keywords: ['anomalia', 'anomalias', 'irregular'],
      response:
        'Em Patos foram identificadas **22 anomalias**, sendo 14 em contratos de pavimentação. A Asfalto Sertão Ltda. venceu 3 licitações acima de R$ 5M no mesmo período, o que levantou alertas.',
    },
    {
      keywords: ['categoria', 'categorias', 'área'],
      response:
        'Em Patos, **Pavimentação domina com 48%**, seguida por Saúde (22%), Educação (16%), Vestuário (9%) e Tecnologia (5%).',
    },
  ],
};

export const DEFAULT_RESPONSE = (contextName: string): string =>
  `Analisei os dados disponíveis sobre **${contextName}**. Posso responder perguntas sobre categorias de contratos, anomalias detectadas, fornecedores recorrentes, evolução temporal e distribuição de valores. Seja mais específico para uma análise detalhada.`;

export const getMockChatResponse = (
  message: string,
  cityId: string | null,
  cityName: string,
): string => {
  const lower = message.toLowerCase();
  const entries = cityId
    ? CHAT_RESPONSES_CIDADE[cityId] ?? CHAT_RESPONSES_GERAL
    : CHAT_RESPONSES_GERAL;

  for (const entry of entries) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.response;
    }
  }

  // Fallback to general if city-specific had no match
  if (cityId && CHAT_RESPONSES_CIDADE[cityId]) {
    for (const entry of CHAT_RESPONSES_GERAL) {
      if (entry.keywords.some((kw) => lower.includes(kw))) {
        return entry.response;
      }
    }
  }

  return DEFAULT_RESPONSE(cityName);
};

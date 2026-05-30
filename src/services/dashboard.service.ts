/**
 * dashboard.service.ts
 *
 * Camada de serviço para dados do dashboard.
 * getDashboardApiData → faz GET no endpoint real e retorna a resposta diretamente.
 * getCityData / getStateData → mantidos com mock para o PainelLateral.
 */

import type { DashboardApiResponse, CityMetrics } from '../types';

const API_BASE = (import.meta.env.VITE_CHAT_URL as string | undefined) ?? 'https://chat-production-487e.up.railway.app/';

/**
 * Busca os dados dos gráficos do dashboard no endpoint real.
 * A API retorna todos os campos com os nomes e tipos esperados pelo frontend:
 *   - orgaos_mais_contratam     → { orgao, contratos }
 *   - municipios_mais_contratam → { municipio, contratos }
 *   - municipios_mais_gastam    → { municipio, gasto }
 *   - modalidades_mais_contratam → { modalidade, valor }
 *   - modalidades_mais_gastam   → { modalidade, valor }
 *   - evolucao_gastos_ano       → { mes, valor }
 */
export const getDashboardApiData = async (): Promise<DashboardApiResponse> => {
  const base = API_BASE.endsWith('/') ? API_BASE : `${API_BASE}/`;
  const url = `${base}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados do dashboard: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<any>;
};


const PARAIBA_GERAL: CityMetrics = {
  id: 'paraiba',
  name: 'Estado da Paraíba',
  totalContratos: 12_450,
  valorTotal: 850_000_000,
  anomalias: 47,
  categoriaPredominante: 'Saúde',
  fornecedorRecorrente: 'Empresa XYZ Ltda.',
};

export const getCityData = async (cityId: string): Promise<CityMetrics> => {
  await new Promise((r) => setTimeout(r, 0));
  return {
    ...PARAIBA_GERAL,
    id: cityId,
    name: cityId.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    totalContratos: Math.floor(Math.random() * 500) + 100,
    valorTotal: Math.floor(Math.random() * 50_000_000) + 10_000_000,
    anomalias: Math.floor(Math.random() * 20) + 2,
  };
};

export const getStateData = async (): Promise<CityMetrics> => {
  await new Promise((r) => setTimeout(r, 0));
  return PARAIBA_GERAL;
};

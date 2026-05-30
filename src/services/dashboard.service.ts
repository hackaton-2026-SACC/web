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
  const base = API_BASE.endsWith('/') ? API_BASE : `${API_BASE}/`;
  const name = cityId.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  const apiParam = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  try {
    const response = await fetch(`${base}${encodeURIComponent(apiParam)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const data = await response.json();
      return {
        id: cityId,
        name: data.nome_real || name,
        totalContratos: data.contratos_pelo_municipio ?? 0,
        valorTotal: data.gasto_pelo_municipio ?? 0,
        anomalias: 0,
        categoriaPredominante: 'Geral',
        fornecedorRecorrente: data.orgaos_mais_contratam?.[0]?.orgao ?? 'Nenhum',
      };
    }
  } catch (error) {
    console.error('Erro ao buscar dados do municipio real:', error);
  }

  // Fallback em caso de erro na API
  return {
    id: cityId,
    name,
    totalContratos: 0,
    valorTotal: 0,
    anomalias: 0,
    categoriaPredominante: 'Geral',
    fornecedorRecorrente: 'Nenhum',
  };
};

export const getStateData = async (): Promise<CityMetrics> => {
  await new Promise((r) => setTimeout(r, 0));
  return PARAIBA_GERAL;
};

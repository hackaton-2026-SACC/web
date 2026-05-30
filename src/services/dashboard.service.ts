/**
 * dashboard.service.ts
 *
 * Camada de serviço para dados do dashboard.
 * Atualmente retorna mocks. Futuramente, basta trocar a implementação
 * para chamadas Axios ao backend, mantendo a mesma interface.
 *
 * Exemplo de migração futura:
 *   import axios from 'axios';
 *   const BASE_URL = import.meta.env.VITE_API_URL;
 *   export const getDashboardData = (cityId?: string) =>
 *     axios.get(`${BASE_URL}/dashboard`, { params: { cityId } }).then(r => r.data);
 */

import {
  DASHBOARD_GERAL,
  getDashboardForCity,
  PARAIBA_GERAL,
  CIDADES_MOCK,
} from '../mocks/cidadesMock';
import type { CityMetrics, DashboardData } from '../types';

/**
 * Retorna os dados do dashboard para o contexto atual.
 * @param cityId - ID da cidade selecionada (null = estado inteiro)
 */
export const getDashboardData = async (cityId?: string | null): Promise<DashboardData> => {
  // Simula latência de rede
  await new Promise((r) => setTimeout(r, 0));

  if (!cityId) return DASHBOARD_GERAL;
  return getDashboardForCity(cityId);
};

/**
 * Retorna métricas detalhadas de uma cidade específica.
 * @param cityId - ID da cidade
 */
export const getCityData = async (cityId: string): Promise<CityMetrics> => {
  await new Promise((r) => setTimeout(r, 0));

  return CIDADES_MOCK[cityId] ?? {
    ...PARAIBA_GERAL,
    id: cityId,
    name: cityId.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    totalContratos: Math.floor(Math.random() * 500) + 100,
    valorTotal: Math.floor(Math.random() * 50_000_000) + 10_000_000,
    anomalias: Math.floor(Math.random() * 20) + 2,
  };
};

/**
 * Retorna métricas gerais do estado.
 */
export const getStateData = async (): Promise<CityMetrics> => {
  await new Promise((r) => setTimeout(r, 0));
  return PARAIBA_GERAL;
};

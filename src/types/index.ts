export interface SelectedLocation {
  id: string;
  name: string;
}

export interface AppContextState {
  selectedCity: SelectedLocation | null;
  setSelectedCity: (city: SelectedLocation | null) => void;
}

export interface CityMetrics {
  id: string;
  name: string;
  totalContratos: number;
  valorTotal: number;
  anomalias: number;
  categoriaPredominante: string;
  fornecedorRecorrente: string;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface EvolucaoData {
  mes: string;
  contratos: number;
  valor: number;
}

export interface FornecedorData {
  name: string;
  contratos: number;
  valor: number;
}

export interface FaixaValorData {
  faixa: string;
  quantidade: number;
}

export interface DashboardData {
  categorias: CategoryData[];
  evolucao: EvolucaoData[];
  fornecedores: FornecedorData[];
  faixasValor: FaixaValorData[];
  insights: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// ─── Tipos da API real ────────────────────────────────────────────────────────

export interface OrgaoContrato {
  orgao: string;
  contratos: number;
}

export interface MunicipioContrato {
  municipio: string;
  contratos: number;
}

export interface MunicipioGasto {
  municipio: string;
  gasto: number;
}

export interface ModalidadeGasto {
  modalidade: string;
  valor: number;
}

export interface EvolucaoGastoMes {
  mes: string;
  valor: number;
}

export interface DashboardApiResponse {
  total_estado: number;
  total_contratos: number;
  orgaos_mais_contratam: OrgaoContrato[];
  municipios_mais_contratam: MunicipioContrato[];
  municipios_mais_gastam: MunicipioGasto[];
  modalidades_mais_contratam: ModalidadeGasto[];
  modalidades_mais_gastam: ModalidadeGasto[];
  evolucao_gastos_ano: EvolucaoGastoMes[];
}

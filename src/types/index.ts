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

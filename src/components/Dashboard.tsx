import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Sparkles, Loader2 } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { getDashboardData } from '../services/dashboard.service';
import type { DashboardData } from '../types';
import GraficoCategoria from './charts/GraficoCategoria';
import GraficoEvolucao from './charts/GraficoEvolucao';
import GraficoFornecedores from './charts/GraficoFornecedores';
import GraficoFaixaValor from './charts/GraficoFaixaValor';

const Dashboard: React.FC = () => {
  const { selectedCity } = useAppContext();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getDashboardData(selectedCity?.id).then((d) => {
      setData(d);
      setLoading(false);
    });
  }, [selectedCity]);

  if (loading || !data) {
    return (
      <section className="flex items-center justify-center gap-3 py-12 text-gray-400 text-[14px]">
        <Loader2 size={22} className="text-blue-600 animate-spin-loader" />
        <span>Atualizando visualizações...</span>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 bg-gray-50">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
            <BarChart3 size={20} className="text-blue-600" />
          </div>
          <h2 className="text-[20px] font-bold text-gray-900 font-[Google_Sans,Inter,system-ui] tracking-tight">
            Dashboard
          </h2>
        </div>
        <span className="text-[12px] font-semibold bg-blue-50 text-blue-600 border border-blue-200 rounded-full px-3.5 py-1">
          {selectedCity ? selectedCity.name : 'Estado da Paraíba'}
        </span>
      </div>

      {/* Charts 2×2 grid → 1 col on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GraficoCategoria data={data.categorias} />
        <GraficoEvolucao data={data.evolucao} />
        <GraficoFornecedores data={data.fornecedores} />
        <GraficoFaixaValor data={data.faixasValor} />
      </div>

      {/* AI Insights */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Sparkles size={20} className="text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[16px] font-bold text-gray-900 font-[Google_Sans,Inter,system-ui]">Insights da IA</h3>
            <p className="text-[12px] text-gray-400 mt-0.5">
              Análise gerada para{' '}
              <strong className="text-blue-600">{selectedCity ? selectedCity.name : 'o Estado da Paraíba'}</strong>
            </p>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold bg-green-50 text-green-600 border border-green-200 rounded-full px-2.5 py-1 flex-shrink-0">
            <TrendingUp size={11} />
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse-dot" />
            Beta
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {data.insights.map((insight, idx) => (
            <div key={idx} className="flex items-start gap-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl px-3.5 py-3 transition-colors">
              <div className="w-5 h-5 rounded-md bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <BarChart3 size={12} className="text-blue-600" />
              </div>
              <span className="text-[13px] text-gray-600 leading-relaxed">{insight}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

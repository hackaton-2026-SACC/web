import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { getDashboardApiData } from '../services/dashboard.service';
import type { DashboardApiResponse } from '../types';
import GraficoOrgaos from './charts/GraficoOrgaos';
import GraficoMunicipiosContratos from './charts/GraficoMunicipiosContratos';
import GraficoMunicipiosGastos from './charts/GraficoMunicipiosGastos';
import GraficoModalidades from './charts/GraficoModalidades';
import GraficoEvolucaoGastos from './charts/GraficoEvolucaoGastos';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(data?.municipios_mais_gastam)

  const fetchData = () => {
    setLoading(true);
    setError(null);
    getDashboardApiData()
      .then((d) => {
        setData(d);
        console.log(d)
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="flex items-center justify-center gap-3 py-16 text-gray-400 text-[14px]">
        <Loader2 size={22} className="text-blue-600 animate-spin" />
        <span>Carregando dados do dashboard...</span>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="flex flex-col items-center justify-center gap-4 py-16 text-gray-500">
        <AlertCircle size={36} className="text-red-400" />
        <p className="text-[14px] text-center max-w-xs">
          Não foi possível carregar os dados.<br />
          <span className="text-[12px] text-gray-400">{error}</span>
        </p>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 text-[13px] font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg px-4 py-2 hover:bg-blue-50 transition-colors"
        >
          <RefreshCw size={14} />
          Tentar novamente
        </button>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-4 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GraficoOrgaos data={data.orgaos_mais_contratam} />
        <GraficoMunicipiosContratos data={data.municipios_mais_contratam} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GraficoMunicipiosGastos data={data.municipios_mais_gastam} />
        <GraficoModalidades data={data.modalidades_mais_gastam} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GraficoEvolucaoGastos data={data.evolucao_gastos_ano} />
      </div>
    </section>
  );
};

export default Dashboard;

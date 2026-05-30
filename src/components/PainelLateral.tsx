import React, { useEffect, useState } from "react";
import {
  FileText, DollarSign, AlertTriangle,
  Building2, MapPin, Info, X,
} from "lucide-react";
import { useAppContext } from "../hooks/useAppContext";
import { getCityData, getDashboardApiData } from "../services/dashboard.service";
import type { CityMetrics } from "../types";

const fmt = (v: number): string => {
  if (v >= 1_000_000_000) return `R$ ${(v / 1_000_000_000).toFixed(2).replace(".", ",")} bi`;
  if (v >= 1_000_000)     return `R$ ${(v / 1_000_000).toFixed(1).replace(".", ",")} mi`;
  return `R$ ${v.toLocaleString("pt-BR")}`;
};

interface MetricCardProps {
  label: string; value: string;
  icon: React.ReactNode; accent: string; bg: string;
}
const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon, accent, bg }) => (
  <div className="bg-gray-50 hover:bg-gray-100 rounded-xl p-3 flex flex-col gap-2 transition-colors">
    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
         style={{ background: bg, color: accent }}>
      {icon}
    </div>
    <div className="text-[11px] text-gray-500 font-medium leading-tight">{label}</div>
    <div className="text-[14px] font-bold text-gray-900">{value}</div>
  </div>
);

interface PainelLateralProps {
  isModal?: boolean;
  onClose?: () => void;
}

const PainelLateral: React.FC<PainelLateralProps> = ({ isModal = false, onClose }) => {
  const { selectedCity } = useAppContext();
  const [metrics, setMetrics] = useState<CityMetrics | null>(null);
  const [stateData, setStateData] = useState<{ totalContratos: number; valorTotal: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const run = async () => {
      try {
        if (selectedCity) {
          // Buscar dados do município selecionado
          const data = await getCityData(selectedCity.id);
          setMetrics(data);
          setStateData(null);
        } else {
          // Buscar dados gerais do estado da API real
          const apiData = await getDashboardApiData();
          setStateData({
            totalContratos: apiData.total_contratos || 0,
            valorTotal: apiData.total_estado || 0,
          });
          setMetrics(null);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setMetrics(null);
        setStateData(null);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [selectedCity]);

  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [isModal]);

  const panel = (
    <aside className={
      isModal
        ? "fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl flex flex-col max-h-[85vh] animate-slide-up"
        : "bg-white border-l border-gray-200 flex flex-col overflow-y-auto overflow-x-hidden"
    }>
      {/* Drag handle (mobile only) */}
      {isModal && (
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 shrink-0 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-1.5">
          {selectedCity ? (
            <>
              <span className="text-[13px] text-gray-400 font-medium">Paraíba</span>
              <span className="text-gray-300 text-sm">›</span>
              <span className="text-[13px] font-semibold text-blue-600">{selectedCity.name}</span>
            </>
          ) : (
            <span className="text-[13px] text-gray-500 font-medium">Estado da Paraíba</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-200 rounded-full px-2.5 py-0.5">
            {selectedCity ? "Município" : "Visão Geral"}
          </span>
          {isModal && onClose && (
            <button onClick={onClose} aria-label="Fechar"
              className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="overflow-y-auto flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400 text-[13px]">
            <div className="w-7 h-7 rounded-full border-2 border-gray-200 border-t-blue-600 animate-spin-loader" />
            <span>Carregando...</span>
          </div>
        ) : metrics ? (
          <div className="p-4 flex flex-col gap-4">
            <h2 className="text-[22px] font-bold text-gray-900 tracking-tight font-[Google_Sans,Inter,system-ui] leading-tight">
              {metrics.name}
            </h2>

            <div className="grid grid-cols-2 gap-2.5">
              <MetricCard label="Total de Contratos" value={metrics.totalContratos.toLocaleString("pt-BR")}
                icon={<FileText size={16} />} accent="#1a73e8" bg="#e8f0fe" />
              <MetricCard label="Valor Total" value={fmt(metrics.valorTotal)}
                icon={<DollarSign size={16} />} accent="#34a853" bg="#e6f4ea" />
            
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Fornecedor Recorrente</p>
              <div className="bg-gray-50 rounded-xl px-3 py-2.5 flex items-center gap-3">
                <Building2 size={20} className="text-gray-400 shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-semibold text-gray-900 truncate">{metrics.fornecedorRecorrente}</span>
                  <span className="text-[11px] text-gray-400">Mais contratos no período</span>
                </div>
              </div>
            </div>


            {!selectedCity && (
              <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-200 rounded-xl p-3 text-[12px] text-blue-700">
                <MapPin size={15} className="shrink-0 mt-0.5" />
                <span>Clique em um município no mapa para ver os dados detalhados.</span>
              </div>
            )}
          </div>
        ) : stateData ? (
          <div className="p-4 flex flex-col gap-4">
            <h2 className="text-[22px] font-bold text-gray-900 tracking-tight font-[Google_Sans,Inter,system-ui] leading-tight">
              Estado da Paraíba
            </h2>

            <div className="grid grid-cols-2 gap-2.5">
              <MetricCard label="Total de Contratos" value={stateData.totalContratos.toLocaleString("pt-BR")}
                icon={<FileText size={16} />} accent="#1a73e8" bg="#e8f0fe" />
              <MetricCard label="Valor Total" value={fmt(stateData.valorTotal)}
                icon={<DollarSign size={16} />} accent="#34a853" bg="#e6f4ea" />
            </div>

            <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-200 rounded-xl p-3 text-[12px] text-blue-700">
              <MapPin size={15} className="shrink-0 mt-0.5" />
              <span>Clique em um município no mapa para ver os dados detalhados.</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400 text-[13px]">
            <Info size={20} />
            <span>Dados indisponíveis</span>
          </div>
        )}
      </div>
    </aside>
  );

  if (isModal) {
    return (
      <>
        <div className="fixed inset-0 z-40 bg-black/40 animate-fade-in" onClick={onClose} aria-hidden="true" />
        {panel}
      </>
    );
  }

  return panel;
};

export default PainelLateral;

import React from 'react';
import { X, MapPin } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';

const Header: React.FC = () => {
  const { selectedCity, setSelectedCity } = useAppContext();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 sm:px-6 bg-white border-b border-gray-200 shadow-sm gap-3">
      {/* Logo */}
      <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
          <MapPin size={16} className="text-white" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-[17px] text-gray-900 tracking-tight font-[Google_Sans,Inter,system-ui]">
            Licitasia
          </span>
          <span className="text-[11px] text-gray-400 hidden sm:block">Licitações e contratos</span>
        </div>
      </div>

      {/* Center title */}
      <div className="flex-1 text-center min-w-0 px-2">
        <span className="hidden md:inline text-[13px] font-medium text-gray-500 truncate">
          Observatório Inteligente de Contratações Públicas da Paraíba
        </span>
        <span className="inline md:hidden text-[12px] font-medium text-gray-500 truncate">
          Contratações Públicas — PB
        </span>
      </div>

      {/* Context pill */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 text-[12px] font-medium text-blue-700">
          <span>Paraíba</span>
          {selectedCity && (
            <>
              <span className="text-blue-300 mx-0.5">›</span>
              <span className="font-bold text-blue-800 max-w-[100px] truncate">{selectedCity.name}</span>
            </>
          )}
        </div>
        {selectedCity && (
          <button
            onClick={() => setSelectedCity(null)}
            title="Limpar seleção"
            aria-label="Limpar município selecionado"
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <X size={15} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import MapaParaiba from '../components/MapaParaiba';
import PainelLateral from '../components/PainelLateral';
import Dashboard from '../components/Dashboard';
import ChatContextual from '../components/ChatContextual';
import { useAppContext } from '../hooks/useAppContext';
import { ChevronUp, ChevronDown, MapPin, Zap, MessageSquare } from 'lucide-react';

const useMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia('(max-width: 768px)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
};

const Home: React.FC = () => {
  const isMobile = useMobile();
  const { selectedCity, setSelectedCity } = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [dashboardExpanded, setDashboardExpanded] = useState(!isMobile);
  const [mapExpanded, setMapExpanded] = useState(true);
  const [chatExpanded, setChatExpanded] = useState(!isMobile);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile && selectedCity) setModalOpen(true);
    if (!selectedCity) setModalOpen(false);
  }, [selectedCity, isMobile]);

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCity(null);
  };

  const scrollPageUp = () => {
    pageRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollPageDown = () => {
    if (pageRef.current) {
      pageRef.current.scrollTo({
        top: pageRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div ref={pageRef} className="flex flex-col min-h-screen bg-gray-50 font-[Inter,system-ui,sans-serif] overflow-x-hidden">
      <Header />

      <div className="border-b border-gray-200 bg-white">
        <div
          className="flex items-center justify-between p-4 md:p-6 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setDashboardExpanded(!dashboardExpanded)}
        >
          <div className="flex items-center gap-2">
            <Zap size={20} className="text-blue-600" />
            <h2 className="font-bold text-gray-900">Dashboard</h2>
          </div>
          <div className={`transform transition-transform ${dashboardExpanded ? 'rotate-180' : ''}`}>
            <ChevronDown size={20} className="text-gray-600" />
          </div>
        </div>
        {dashboardExpanded && (
          <div className="px-4 md:px-6 pb-4 md:pb-6">
            <Dashboard />
          </div>
        )}
      </div>

      <div className="border-b border-gray-200 bg-white">
        <div
          className="flex items-center justify-between p-4 md:p-6 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-200"
          onClick={() => setMapExpanded(!mapExpanded)}
        >
          <div className="flex items-center gap-2">
            <MapPin size={20} className="text-blue-600" />
            <h2 className="font-bold text-gray-900">Mapa</h2>
          </div>
          <div className={`transform transition-transform ${mapExpanded ? 'rotate-180' : ''}`}>
            <ChevronDown size={20} className="text-gray-600" />
          </div>
        </div>

        {mapExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_320px]" style={{ height: isMobile ? '300px' : 'calc(100vh - 200px)', minHeight: '300px' }}>
            <div className="relative overflow-hidden bg-[#e8edf2]">
              <MapaParaiba />
            </div>
            {!isMobile && <PainelLateral />}
          </div>
        )}
      </div>

      {isMobile && modalOpen && (
        <PainelLateral isModal onClose={handleCloseModal} />
      )}

      <div className="border-b border-gray-200 bg-white">
        <div
          className="flex items-center justify-between p-4 md:p-6 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-200"
          onClick={() => setChatExpanded(!chatExpanded)}
        >
          <div className="flex items-center gap-2">
            <MessageSquare size={20} className="text-blue-600" />
            <h2 className="font-bold text-gray-900">Chat</h2>
          </div>
          <div className={`transform transition-transform ${chatExpanded ? 'rotate-180' : ''}`}>
            <ChevronDown size={20} className="text-gray-600" />
          </div>
        </div>

        {chatExpanded && (
          <div className="px-4 md:px-6 pb-4 md:pb-6">
            <ChatContextual />
          </div>
        )}
      </div>

      {/* Scroll Navigation Button - Mobile only */}
      {isMobile && (
        <div className="fixed bottom-6 right-4 flex flex-col gap-2 z-50">
          <button
            onClick={scrollPageUp}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
            aria-label="Scroll para cima"
            title="Scroll para cima"
          >
            <ChevronUp size={20} />
          </button>
          <button
            onClick={scrollPageDown}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
            aria-label="Scroll para baixo"
            title="Scroll para baixo"
          >
            <ChevronDown size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;

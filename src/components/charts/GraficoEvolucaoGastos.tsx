import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { EvolucaoGastoMes } from '../../types';

interface Props {
  data?: EvolucaoGastoMes[];
}

const fmt = (v: number) =>
  v >= 1_000_000
    ? `R$ ${(v / 1_000_000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}M`
    : `R$ ${v.toLocaleString('pt-BR')}`;

const GraficoEvolucaoGastos: React.FC<Props> = ({ data = [] }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-none flex flex-col gap-3.5 hover:shadow-md transition-shadow col-span-1 sm:col-span-2">
    <div className="flex items-baseline justify-between gap-2">
      <h3 className="text-[14px] font-semibold text-gray-900">Evolução de Gastos no Ano</h3>
      <span className="text-[12px] text-gray-400 whitespace-nowrap">valor mensal</span>
    </div>
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="gradGasto" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1a73e8" stopOpacity={0.18} />
            <stop offset="95%" stopColor="#1a73e8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f4" vertical={false} />
        <XAxis
          dataKey="mes"
          tick={{ fill: '#80868b', fontSize: 11 }}
          axisLine={{ stroke: '#dadce0' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#80868b', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: number) =>
            v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` : `${v}`
          }
        />
        <Tooltip
          contentStyle={{
            background: '#fff',
            border: '1px solid #dadce0',
            borderRadius: 8,
            color: '#202124',
            fontSize: 13,
          }}
          formatter={(v: number) => [fmt(v), 'Gasto']}
        />
        <Area
          type="monotone"
          dataKey="valor"
          stroke="#1a73e8"
          strokeWidth={2.5}
          fill="url(#gradGasto)"
          dot={{ r: 3, fill: '#1a73e8' }}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default GraficoEvolucaoGastos;

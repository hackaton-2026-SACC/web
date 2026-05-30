import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { MunicipioGasto } from '../../types';

interface Props {
  data?: MunicipioGasto[];
}

const COLORS = ['#ea4335', '#e05144', '#d66153', '#cc7062', '#c28071'];

const fmt = (v: number) =>
  v >= 1_000_000
    ? `R$ ${(v / 1_000_000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}M`
    : `R$ ${v.toLocaleString('pt-BR')}`;

const GraficoMunicipiosGastos: React.FC<Props> = ({ data = [] }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-none flex flex-col gap-3.5 hover:shadow-md transition-shadow">
    <div className="flex items-baseline justify-between gap-2">
      <h3 className="text-[14px] font-semibold text-gray-900">Municípios que Mais Gastam</h3>
      <span className="text-[12px] text-gray-400 whitespace-nowrap">valor total</span>
    </div>
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f4" vertical={false} />
        <XAxis
          dataKey="municipio"
          tick={{ fill: '#80868b', fontSize: 11 }}
          axisLine={{ stroke: '#dadce0' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#80868b', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: number) =>
            v >= 1_000_000 ? `${(v / 1_000_000).toFixed(0)}M` : `${v}`
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
        <Bar dataKey="gasto" radius={[4, 4, 0, 0]} maxBarSize={48}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default GraficoMunicipiosGastos;

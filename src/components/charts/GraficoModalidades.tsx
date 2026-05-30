import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { ModalidadeGasto } from '../../types';

interface Props {
  data?: ModalidadeGasto[];
}

const COLORS = ['#1a73e8', '#34a853', '#fbbc04', '#ea4335', '#4285f4'];

const fmt = (v: number) =>
  v >= 1_000_000
    ? `R$ ${(v / 1_000_000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}M`
    : `R$ ${v.toLocaleString('pt-BR')}`;

const RADIAN = Math.PI / 180;
const renderLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
}: {
  cx: number; cy: number; midAngle: number;
  innerRadius: number; outerRadius: number; percent: number;
}) => {
  if (percent < 0.05) return null;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const GraficoModalidades: React.FC<Props> = ({ data = [] }) => {
  const colored = data.map((d, i) => ({ ...d, color: COLORS[i % COLORS.length] }));
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-none flex flex-col gap-3.5 hover:shadow-md transition-shadow">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-[14px] font-semibold text-gray-900">Gastos por Modalidade</h3>
        <span className="text-[12px] text-gray-400 whitespace-nowrap">valor total</span>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={colored}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={3}
            dataKey="valor"
            nameKey="modalidade"
            labelLine={false}
            label={renderLabel}
          >
            {colored.map((e, i) => (
              <Cell key={i} fill={e.color} stroke="white" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: '#fff',
              border: '1px solid #dadce0',
              borderRadius: 8,
              color: '#202124',
              fontSize: 13,
            }}
            formatter={(v: number) => [fmt(v), 'Valor']}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ color: '#5f6368', fontSize: 11 }}
            formatter={(value) => value}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoModalidades;

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { FaixaValorData } from "../../types";

interface Props {
  data: FaixaValorData[];
}

const COLORS = ["#34a853", "#2e9549", "#25883f", "#1e7a36", "#166c2d"];

const GraficoFaixaValor: React.FC<Props> = ({ data }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-3.5 hover:shadow-md transition-shadow">
    <div className="flex items-baseline justify-between gap-2">
      <h3 className="text-[14px] font-semibold text-gray-900">Contratos por Faixa de Valor</h3>
      <span className="text-[12px] text-gray-400 whitespace-nowrap">Quantidade por faixa</span>
    </div>
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#f1f3f4"
          vertical={false}
        />
        <XAxis
          dataKey="faixa"
          tick={{ fill: "#80868b", fontSize: 11 }}
          axisLine={{ stroke: "#dadce0" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#80868b", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "#fff",
            border: "1px solid #dadce0",
            borderRadius: 8,
            color: "#202124",
            fontSize: 13,
          }}
          formatter={(v: number) => [v.toLocaleString("pt-BR"), "Contratos"]}
        />
        <Bar dataKey="quantidade" radius={[4, 4, 0, 0]} maxBarSize={48}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default GraficoFaixaValor;

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
import type { FornecedorData } from "../../types";

interface Props {
  data: FornecedorData[];
}

const COLORS = ["#1a73e8", "#4285f4", "#5a95f5", "#6ea7f7", "#82b6f8"];

const GraficoFornecedores: React.FC<Props> = ({ data }) => {
  const short = (n: string) => n.split(" ").slice(0, 2).join(" ");
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-3.5 hover:shadow-md transition-shadow">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-[14px] font-semibold text-gray-900">Top Fornecedores</h3>
        <span className="text-[12px] text-gray-400 whitespace-nowrap">Por número de contratos</span>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f3f4"
            horizontal={false}
          />
          <XAxis
            type="number"
            tick={{ fill: "#80868b", fontSize: 11 }}
            axisLine={{ stroke: "#dadce0" }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "#5f6368", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={110}
            tickFormatter={short}
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
          <Bar dataKey="contratos" radius={[0, 4, 4, 0]} maxBarSize={26}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoFornecedores;

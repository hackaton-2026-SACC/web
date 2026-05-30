import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { EvolucaoData } from "../../types";

interface Props {
  data: EvolucaoData[];
}

const TOOLTIP_STYLE = {
  background: "#fff",
  border: "1px solid #dadce0",
  borderRadius: 8,
  color: "#202124",
  fontSize: 13,
};

const GraficoEvolucao: React.FC<Props> = ({ data }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-none flex flex-col gap-3.5 hover:shadow-md transition-shadow">
    <div className="flex items-baseline justify-between gap-2">
      <h3 className="text-[14px] font-semibold text-gray-900">Evolução Temporal</h3>
      <span className="text-[12px] text-gray-400 whitespace-nowrap">Contratos e valor (R$ mi) por mês</span>
    </div>
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f4" />
        <XAxis
          dataKey="mes"
          tick={{ fill: "#80868b", fontSize: 11 }}
          axisLine={{ stroke: "#dadce0" }}
          tickLine={false}
        />
        <YAxis
          yAxisId="c"
          orientation="left"
          tick={{ fill: "#80868b", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          yAxisId="v"
          orientation="right"
          tick={{ fill: "#80868b", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          formatter={(v: number, n: string) => [
            n === "contratos" ? v.toLocaleString("pt-BR") : `R$ ${v}M`,
            n === "contratos" ? "Contratos" : "Valor (R$ mi)",
          ]}
        />
        <Legend
          wrapperStyle={{ color: "#5f6368", fontSize: 12 }}
          formatter={(v) => (v === "contratos" ? "Contratos" : "Valor (R$ mi)")}
        />
        <Line
          yAxisId="c"
          type="monotone"
          dataKey="contratos"
          stroke="#1a73e8"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "#1a73e8" }}
          activeDot={{ r: 5 }}
        />
        <Line
          yAxisId="v"
          type="monotone"
          dataKey="valor"
          stroke="#34a853"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "#34a853" }}
          activeDot={{ r: 5 }}
          strokeDasharray="5 3"
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default GraficoEvolucao;

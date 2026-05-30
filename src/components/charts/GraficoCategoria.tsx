import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { CategoryData } from "../../types";

interface Props {
  data: CategoryData[];
}

const COLORS = ["#1a73e8", "#34a853", "#fbbc04", "#ea4335", "#4285f4"];

const RADIAN = Math.PI / 180;
const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  value: number;
}) => {
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={700}
    >
      {`${value}%`}
    </text>
  );
};

const GraficoCategoria: React.FC<Props> = ({ data }) => {
  const colored = data.map((d, i) => ({
    ...d,
    color: COLORS[i % COLORS.length],
  }));
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-none flex flex-col gap-3.5 hover:shadow-md transition-shadow">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-[14px] font-semibold text-gray-900">Distribuição por Categoria</h3>
        <span className="text-[12px] text-gray-400 whitespace-nowrap">% do total de contratos</span>
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
            dataKey="value"
            labelLine={false}
            label={renderLabel}
          >
            {colored.map((e, i) => (
              <Cell key={i} fill={e.color} stroke="white" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid #dadce0",
              borderRadius: 8,
              color: "#202124",
              fontSize: 13,
            }}
            formatter={(v: number, n: string) => [`${v}%`, n]}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ color: "#5f6368", fontSize: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoCategoria;

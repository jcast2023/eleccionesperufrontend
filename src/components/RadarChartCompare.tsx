import { ResponsiveContainer } from "recharts";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend
} from "recharts";

interface RadarData {
  categoria: string;
  valor1: number;
  valor2: number;
}

interface Props {
  data: RadarData[];
  candidato1: string;
  candidato2: string;
}

export default function RadarChartCompare({
  data,
  candidato1,
  candidato2
}: Props) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="categoria" />   {/* ← Cambiado a "categoria" */}
        
        <PolarRadiusAxis 
          domain={[0, 5]} 
          tickCount={6}
        />

        <Radar
          name={candidato1}
          dataKey="valor1"
          stroke="#6366f1"
          fill="#6366f1"
          fillOpacity={0.5}
        />

        <Radar
          name={candidato2}
          dataKey="valor2"
          stroke="#22c55e"
          fill="#22c55e"
          fillOpacity={0.5}
        />

        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
}
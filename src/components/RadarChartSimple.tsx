import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

interface RadarData {
  tema: string;
  valor: number;
}

interface Props {
  data: RadarData[];
}

export default function RadarChartSimple({ data }: Props) {
  return (
    <RadarChart width={500} height={350} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="tema" />
      <PolarRadiusAxis domain={[0, 5]} />

      <Radar
        name="Afinidad"
        dataKey="valor"
        stroke="#6366f1"
        fill="#6366f1"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
}

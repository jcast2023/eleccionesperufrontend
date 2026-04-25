export interface Respuestas {
  [tema: string]: number;
}
export interface Denuncia {
  descripcion: string;
  estado: string;
  gravedad: number;
  fuente: string;
   tipo: string;
  fuenteUrl?: string | null;
  fecha?: string | null;
}
export interface Resultado {
  candidato: string;
  mensaje: string;
  coincidencias: string[];
  diferencias: string[];
  porcentaje: number;
  riesgo: string;
  explicacion: string;
  denuncias: Denuncia[];
  totalDenuncias: number;
}


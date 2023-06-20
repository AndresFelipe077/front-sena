import { CiudadModel } from "./ciudad.model";

export interface DepartamentoModel {
  id: number;
  descripcion: string;

  ciudades?: CiudadModel[];
}

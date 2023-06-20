import { DepartamentoModel } from './departamento.model';
import { SedeModel } from './sede.model';

export interface CiudadModel {
  id: number;
  codigo: string;
  descripcion: string;
  idDepartamento ?: number;

  departamento ?: DepartamentoModel;
  sedes?: SedeModel[];
}
 
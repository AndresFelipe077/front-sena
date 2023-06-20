import { PersonaModel } from './persona.model';
import { TipoContratoModel } from './tipo-contrato.model';

export interface ContratoModel {
  id?: number;
  fechaContratacion?: string;
  horaSistema?: string;
  perfilProfesional?: string;
  otrosi?: string;
  numeroContrato?: string;
  fechaSistema?: string;
  observacion?: string;
  fechaFinalContrato?: string;

  idtipoContrato?: number;
  idpersona?: number;

  persona?: PersonaModel;
  tipoContrato?: TipoContratoModel;
}
 
import { GrupoModel } from './grupo.model';
import { UsuarioModel } from './usuario.model';

export interface AsignacionParticipanteModel {
  id?: number;
  idGrupo?: number;
  idParticipante?: number;
  fechaInicial: Date;
  fechaFinal:Date;
  descripcion:string;
  participante?: UsuarioModel;
  grupo?: GrupoModel;
}
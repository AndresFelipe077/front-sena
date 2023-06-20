import { AsignacionJornadaGrupoModel } from './asignacion-jornada-grupo.model';
// import { DiaJornadaModel } from './dia_jornada.model';
export interface JornadaModel {

  checked?: boolean;

  id?: number;
  nombreJornada?: string;
  descripcion?: string;
  horaInicial?: string;
  horaFinal?: string;
  numeroHoras?: number;

  // diaJornada?: DiaJornadaModel[];

  jornada_grupo?:AsignacionJornadaGrupoModel;

}

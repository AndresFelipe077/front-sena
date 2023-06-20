import { PersonaModel } from './persona.model';
import { RolModel } from './rol.model';

export interface UsuarioModel {
  id: number;
  email: string;
  contrasena: string;
  idPersona?:number;
  company_id?: number;
  roles?: RolModel[];
  persona?:PersonaModel;
}

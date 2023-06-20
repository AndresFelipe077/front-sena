import { AreaModel } from "./area.model";
import { HorarioInfrModel } from "./horario-infraestructura.model";
import { SedeModel } from "./sede.model";

export interface InfraestructuraModel{
    id?:number;
    nombreInfraestructura:string;
    capacidad:number;
    codigoQr?:string;
    descripcion?:string;

    idSede?:number;
    idArea?:number;

    sede?:SedeModel;
    area?:AreaModel;

    horario_infraestructura?:HorarioInfrModel;

    newQr?:string;
}

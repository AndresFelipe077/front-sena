import { GrupoModel } from "@models/grupo.model";
import { InfraestructuraModel } from "@models/infraestructura.model";

export interface HorarioInfrModel {
    id?:number;

    idGrupo?:number;
    idInfraestructura?:number;

    fechaInicial:Date;
    fechaFinal:Date;

    infraestructura?:InfraestructuraModel;
    grupo?:GrupoModel;
}

import { InfraestructuraModel } from "./infraestructura.model";

export interface AreaModel {
    id?: number;
    nombreArea:string;
    codigo:string;
    iconUrl?: string;
    infraestructuras?:InfraestructuraModel[];
}

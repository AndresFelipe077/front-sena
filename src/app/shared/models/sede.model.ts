import { CentroFormacionModel } from "./centro-formacion.model";
import { CiudadModel } from "./ciudad.model";
import { InfraestructuraModel } from "./infraestructura.model";

export interface SedeModel{
    id?:number;
    nombreSede:string;
    direccion:string;
    telefono:string;
    descripcion?:string;

    idCiudad?:number;
    idCentroFormacion?:number;

    ciudad?:CiudadModel;
    centro_formacion?:CentroFormacionModel;
    infraestructuras?:InfraestructuraModel[];
}

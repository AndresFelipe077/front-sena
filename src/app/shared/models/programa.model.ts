
export interface ProgramaModel {
    id?: number;
    nombrePrograma: string;
    codigoPrograma:string;
    descripcionPrograma: string;
    idTipoPrograma:number;
    idEstado:number;
    totalHoras:number;
    etapaLectiva:number;
    etapaProductiva:number;
    creditosLectiva:number;
    creditosProductiva:number;
    rutaArchivo:any;
  }
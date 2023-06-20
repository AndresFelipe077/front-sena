import { Injectable } from '@angular/core';
import { ProyectoFormativoModel } from '../models/proyecto-formativo.model ';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoFormativoService {

  proyecto!: ProyectoFormativoModel;

  constructor(
    private _coreService: CoreService
  ) { }

  public traerProyecto() {
    return this._coreService.get<ProyectoFormativoModel[]>('proyecto_formativo');
  }


  crearProyecto(proyecto: ProyectoFormativoModel) {
    proyecto.nombre = proyecto.nombre.toUpperCase();
    proyecto.codigo= proyecto.codigo.toUpperCase();
    proyecto.idPrograma = proyecto.idPrograma;
    proyecto.tiempoEstimado = proyecto.tiempoEstimado;
    proyecto.numeroTotalRaps = proyecto.numeroTotalRaps;
    proyecto.idCentroFormacion = proyecto.idCentroFormacion;

    console.log('llega asi', proyecto);    
    return this._coreService.post<ProyectoFormativoModel>('proyecto_formativo', proyecto);
  }


  eliminarProyecto(proyectoId: number) {
    return this._coreService.delete('proyecto_formativo/' + proyectoId);
  }

  
  actualizarProyecto(proyecto: ProyectoFormativoModel) {

    return this._coreService.put('proyecto_formativo/' + proyecto.id, proyecto);
  }
}

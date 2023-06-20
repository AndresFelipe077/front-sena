import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { AsignacionJornadaGrupoModel } from '@models/asignacion-jornada-grupo.model';

@Injectable({
  providedIn: 'root'
})
export class AsignacionJornadaGrupoService {

  constructor(
    private _coreService: CoreService
  ) { }
  traerGruposJornada() {
    return this._coreService.get<AsignacionJornadaGrupoModel[]>('gruposjornada');
  }
  crearGrupoJornada(grupoJornada: AsignacionJornadaGrupoModel) {
    return this._coreService.post<AsignacionJornadaGrupoModel>('gruposjornada', grupoJornada);
  }
  public getGrupoJornadaByGrupo(id: number) {
    return this._coreService.get<AsignacionJornadaGrupoModel[]>('jornadagrupo/grupo/' + id);
  }
}

import { Injectable } from '@angular/core';
import { TipoGrupoModel } from '@models/tipogrupo.model';
import { CoreService } from './core.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoGrupoService {

  tipoGrupoModel!: TipoGrupoModel;

  constructor(
    private _coreService: CoreService,
    private http: HttpClient,
  ) { }

  public traerTipoGrupos() {
    return this._coreService.get<TipoGrupoModel[]>('tipogrupos');
  }

  crearTipoGrupo(tipoGrupo: TipoGrupoModel) {
    tipoGrupo.nombreTipoGrupo = tipoGrupo.nombreTipoGrupo!.toUpperCase();
    return this._coreService.post<TipoGrupoModel>('tipogrupos', tipoGrupo);
  }

  eliminarTipoGrupo(tipoGrupoId: number) {
    return this._coreService.delete('tipogrupos/' + tipoGrupoId);
  }

  actualizarTipoGrupo(tipoGrupo: TipoGrupoModel) {
    tipoGrupo.nombreTipoGrupo = tipoGrupo.nombreTipoGrupo!.toUpperCase();
    return this._coreService.put('tipogrupos/' + tipoGrupo.id, tipoGrupo);
  }

}

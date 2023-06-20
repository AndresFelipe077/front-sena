import { Injectable } from '@angular/core';
import { GrupoModel } from '@models/grupo.model';
import { CoreService } from './core.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  constructor(
    private _coreService: CoreService
  ) { }

  traerGrupo(id: number) {
    const url = `grupos/${id}`;
    return this._coreService.get<GrupoModel>(url);
  }

  searchGrupos(query: string): Observable<any[]> {
    return this._coreService.get<any[]>('grupos' + `/obtenergrupos?grupo=` + `${query}`);
  }

  traerGrupos() {
    const url = `grupos`;
    return this._coreService.get<GrupoModel[]>(url);
  }

  crearGrupo(grupo: GrupoModel) {
    const url = `grupos`;
    grupo.nombre            = grupo.nombre.toUpperCase();
    grupo.observacion       = grupo.observacion.toUpperCase();
    return this._coreService.post<GrupoModel>(url,grupo);

  }

  eliminarGrupo(id: number) {
    const url = `grupos/${id}`;
    return this._coreService.delete(url);
  }

  actualizarGrupo(grupo: GrupoModel) {
    const url = `grupos/${grupo.id}`;
    // grupo.nombre            = grupo.nombre.toUpperCase();
    grupo.observacion       = grupo.observacion.toUpperCase();
    return this._coreService.put(url, grupo);
  }

}

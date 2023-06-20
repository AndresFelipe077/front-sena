import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { JornadaModel } from '@models/jornada.model';

@Injectable({
  providedIn: 'root',
})
export class JornadaService {
  JornadaModel!: JornadaModel;

  constructor(private _coreService: CoreService) {}

  public traerJornada() {
    return this._coreService.get<JornadaModel[]>('jornadas');
  }

  public getJornadaById(id: number) {
    return this._coreService.get<JornadaModel>('jornadas/' + id);
  }

  crearJornada(jornada: JornadaModel) {
    jornada.nombreJornada = jornada.nombreJornada!.toUpperCase();
    return this._coreService.post<JornadaModel>('jornadas', jornada);
  }

  eliminarJornada(jornadaId: number) {
    return this._coreService.delete('jornadas/' + jornadaId);
  }
  actualizarJornada(jorn: JornadaModel) {
    jorn.nombreJornada = jorn.nombreJornada!.toUpperCase();
    return this._coreService.put('jornadas/' + jorn.id, jorn);
  }
}

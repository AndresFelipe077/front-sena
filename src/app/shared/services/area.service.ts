import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { AreaModel } from '../models/area.model';

@Injectable({
  providedIn: 'root'
})

export class AreaService {

  constructor(
    private _coreService: CoreService
  ) { }

  //retorna todos las areas
  traerAreas(){
    return this._coreService.get<AreaModel[]>('areas');
  }
  //retorna un area al introducir una id
  traerArea(id:number){
    const url:string=`areas/${id}`;
    return this._coreService.get<AreaModel>(url);
  }
  //borra una area de la base de datos
  borrarArea(id:number){
    const url:string=`areas/${id}`;
    return this._coreService.delete(url);
  }
  //crea un area
  guardarArea(area: AreaModel){
    area.nombreArea = area.nombreArea.toUpperCase();
    area.codigo = area.codigo.toUpperCase();
    return this._coreService.post<AreaModel>('areas',area);
  }
  //actualiza un area existente
  actualizarArea(area: AreaModel){
    const url:string=`areas/${area.id}`;
    area.nombreArea = area.nombreArea.toUpperCase();
    area.codigo = area.codigo.toUpperCase();
    return this._coreService.put(url,area);
  }

}
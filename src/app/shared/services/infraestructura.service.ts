import { Injectable } from '@angular/core';
import { InfraestructuraModel } from '@models/infraestructura.model';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class InfraestructuraService {

  constructor(
    private _coreService: CoreService
  ) { }
  //retorna todas las infraestructuras
  traerInfraestructuras(){
    return this._coreService.get<InfraestructuraModel[]>('infraestructuras');
  }
  //retorna una infraestructura basado en su id
  traerInfraestructura(id:number){
    const url:string=`infraestructuras/${id}`;
    return this._coreService.get<InfraestructuraModel>(url);
  }
  //trae las infraestructuras pasandole la id de la sede
  infrBySede(id:number){
    const url:string=`infraestructuras/sede/${id}`;
    return this._coreService.get<InfraestructuraModel[]>(url);
  }
   //trae las infraestructuras pasandole la id de la sede
   infrByArea(id:number){
    const url:string=`infraestructuras/area/${id}`;
    return this._coreService.get<InfraestructuraModel[]>(url);
  }
   //trae las infraestructuras pasandole la id de la sede
   infrBySedeArea(idSede:number,idArea:number){
    const url:string=`infraestructuras/sede/${idSede}/area/${idArea}`;
    return this._coreService.get<InfraestructuraModel[]>(url);
  }
  //borra una infraestructura de la base de datos
  borrarInfraestructura(id:number){
    const url:string=`infraestructuras/${id}`;
    return this._coreService.delete(url);
  }
  //crea una infraestructura
  guardarInfraestructura(infraestructura:InfraestructuraModel){
    infraestructura.nombreInfraestructura=infraestructura.nombreInfraestructura.toUpperCase();
    if(infraestructura.descripcion){
      infraestructura.descripcion=infraestructura.descripcion.toLowerCase();
    }
    return this._coreService.post<InfraestructuraModel>('infraestructuras',infraestructura);
  }
  //crea varias infraestructuras
  guardarInfraestructuras(infrs:InfraestructuraModel[]){
    infrs.forEach(infr=>{
      infr.nombreInfraestructura=infr.nombreInfraestructura.toUpperCase();
      if(infr.descripcion){
        infr.descripcion=infr.descripcion.toLocaleLowerCase();
      } 
    });
    return this._coreService.post<InfraestructuraModel[]>('infraestructuras',infrs);
  }
  //actualiza una infraestructura existente
  actualizarInfraestructura(infraestructura: InfraestructuraModel){
    const url:string=`infraestructuras/${infraestructura.id}`;
    infraestructura.nombreInfraestructura=infraestructura.nombreInfraestructura.toUpperCase();
    if(infraestructura.descripcion){
      infraestructura.descripcion=infraestructura.descripcion.toLowerCase();
    }
    return this._coreService.put<InfraestructuraModel>(url,infraestructura);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InfraestructuraModel } from '@models/infraestructura.model';

@Component({
  selector: 'app-grupo-infra',
  templateUrl: './grupo-infra.component.html',
  styleUrls: ['./grupo-infra.component.css']
})
export class GrupoInfraComponent {

  @Input() infraestructura!:InfraestructuraModel;

  @Output() remove = new EventEmitter<number>();
  borrarInfr(){
    this.remove.emit(this.infraestructura.id);
  }

}

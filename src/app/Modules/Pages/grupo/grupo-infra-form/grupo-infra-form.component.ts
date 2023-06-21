import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { InfraestructuraModel } from '@models/infraestructura.model';
import { NotificationOptions } from '@models/notification-options.model';
import { NotificationService } from '@services/notification-service';

@Component({
  selector: 'app-grupo-infra-form',
  templateUrl: './grupo-infra-form.component.html',
  styleUrls: ['./grupo-infra-form.component.css']
})
export class GrupoInfraFormComponent {

  options: NotificationOptions = { message: "Por favor seleccione una infraestructura existente"};

  @Input() infraestructuras: InfraestructuraModel[] = [];

  @Output() storeInfr = new EventEmitter<InfraestructuraModel>();
  @Output() cancelInfr = new EventEmitter<void>();


  constructor(
    private _noficacionService: NotificationService,
  ){}


  formGrupoInfr: UntypedFormGroup = new FormGroup({
    idInfraestructura:new FormControl(),
    fechaInicial: new FormControl(),
    fechaFinal: new FormControl()
  });
  infraestructura!: InfraestructuraModel;

  get idInfraestructuraField() {
    return this.formGrupoInfr.get('idInfraestructura');
  }
  get fechaInicialField() {
    return this.formGrupoInfr.get('fechaInicial');
  }
  get fechaFinalField() {
    return this.formGrupoInfr.get('fechaFinal');
  }

  seleccionarInfraestructura(event: any) {
    const value: string = event.target.value;
    const data: string[] = value.split('/');

    const infraestructuraEncontrada = this.infraestructuras.find((infr) =>
      (infr.nombreInfraestructura.toLowerCase() === data[0].toLowerCase()) &&
      (infr.sede?.nombreSede.toLowerCase() === data[1].toLowerCase())
    );

    if (infraestructuraEncontrada) {
      this.infraestructura = infraestructuraEncontrada;
      this.infraestructura.horario_infraestructura = {
        idInfraestructura: this.infraestructura.id,
        fechaInicial: new Date(),
        fechaFinal: new Date()
      };
    } else {
      console.log('Error 1')
      this._noficacionService.showNotification(this.options);
    }
  }


  enviarInfraestructura(form: FormGroup) {
    if (form.valid) {
      this.addInfraestructura();
    } else {
      console.log('Error 2')
      this._noficacionService.showNotification(this.options);
    }
  }

  addInfraestructura() {
    this.infraestructura.horario_infraestructura!.fechaInicial = this.getControl('fechaInicial').value;
    this.infraestructura.horario_infraestructura!.fechaFinal = this.getControl('fechaFinal').value
    this.storeInfr.emit(this.infraestructura);
  }


  cancelar() {
    this.cancelInfr.emit();
  }
  private getControl(control: string) {
    return this.formGrupoInfr.controls[control];
  }


  opciones = [
    { id: 1, nombre: 'Opción 1' },
    { id: 2, nombre: 'Opción 2' },
    { id: 3, nombre: 'Opción 3' },
    { id: 4, nombre: 'Opción 4' },
    { id: 5, nombre: 'Opción 5' }
  ];
  opcionSeleccionada: any;


}

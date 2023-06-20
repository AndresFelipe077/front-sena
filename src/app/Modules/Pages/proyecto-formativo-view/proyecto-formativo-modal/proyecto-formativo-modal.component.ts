import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { ProgramaModel } from 'src/app/shared/models/programa.model';
import { ProyectoFormativoModel } from 'src/app/shared/models/proyecto-formativo.model ';
import { ProgramaService } from 'src/app/shared/services/programa.service';
import { NotificationService } from 'src/app/shared/services/notification-service';
import { debounceTime } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProyectoFormativoService } from 'src/app/shared/services/proyecto-formativo.service';




@Component({
  selector: 'app-proyecto-formativo-modal',
  templateUrl: './proyecto-formativo-modal.component.html',
  styleUrls: ['./proyecto-formativo-modal.component.css']
})
export class ProyectoFormativoModalComponent {




  formProyecto!: UntypedFormGroup;
  Programas: ProgramaModel[] = [];

  constructor(
    private ProyectoService: ProyectoFormativoService,
    private dialogRef: MatDialogRef<ProyectoFormativoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public proyecto: ProyectoFormativoModel,
    private formBuilder: UntypedFormBuilder,
    private programaService: ProgramaService,
    private NotificationService: NotificationService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.traerPrograma();
    this.setProyecto();

  }

  ngOnViewInit() {
    this.setProyecto();
  }
 
  traerPrograma() {

    
    this.programaService.traerProgramas()
      .subscribe((programa: ProgramaModel[]) => {
        this.Programas = programa;
      }, error => {
        this.NotificationService.showNotification({ message: 'Error de conexión' });
      });


      var a = this.Programas.map(programa => programa.nombrePrograma)

  }

  get nombreProyectoField() {
    return this.formProyecto.get('nombre');
  }

  get codigoProyecto() {
    return this.formProyecto.get('codigo');
  }

  get idPrograma() {
    return this.formProyecto.get('idPrograma');
  }

  get tiempoEstimado() {
    return this.formProyecto.get('tiempoEstimado');
  }

  get numeroTotalRaps() {
    return this.formProyecto.get('numeroTotalRaps');
  }

  get idCentroFormacion() {
    return this.formProyecto.get('idCentroFormacion');
  }


  setProyecto() {
    if (this.proyecto) {
      this.formProyecto.patchValue({
        nombre: this.proyecto.nombre,
        codigo: this.proyecto.codigo,
        idPrograma: this.proyecto.idPrograma,
        tiempoEstimado: this.proyecto.tiempoEstimado,
        numeroTotalRaps: this.proyecto.numeroTotalRaps,
        idCentroFormacion: this.proyecto.idCentroFormacion
      })
    }
  }

  private buildForm() {
    this.formProyecto = this.formBuilder.group({
      id: [0],
      nombre: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      idPrograma: ['', [Validators.required]],
      tiempoEstimado: ['', [Validators.required]],
      numeroTotalRaps: ['', [Validators.required]],
      idCentroFormacion: ['', [Validators.required]]
    });


  }

  ///////////////////////////////////////////////////


  inputValue: string = "";
  convertToUppercase(inputValue: string): void {
    this.inputValue = inputValue.toUpperCase();
  }


  eliminarProyecto(proyectoId: number) {
    this.ProyectoService.eliminarProyecto(proyectoId).subscribe(() => {
      this.getProyecto();
    })
  }


  guardarProyecto() {
    this.NotificationService.showNotification({ message: "¡Guardado correctamente!" })
    var proyecto = this.getProyecto();
    if (proyecto.id) {
      this.ProyectoService.actualizarProyecto(proyecto).subscribe(proyecto => {
        this.getProyecto();
      });
    } else {
      this.ProyectoService.crearProyecto(proyecto).subscribe(proyecto => {
        this.getProyecto();
      })
    }
  }

  /*
    closeModal() {
      this.cancel.emit();
    }
  */
  private getControl(name: string) {
    return this.formProyecto.controls[name];
  }

  getProyecto(): ProyectoFormativoModel {
    return {
      id: this.proyecto?.id,
      idPrograma: this.getControl('idPrograma').value,
      nombre: this.getControl('nombre').value,
      codigo: this.getControl('codigo').value,
      tiempoEstimado: this.getControl('tiempoEstimado').value,
      numeroTotalRaps: this.getControl('numeroTotalRaps').value,
      idCentroFormacion: this.getControl('idCentroFormacion').value
    }
  }



}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProyectoFormativoModel } from 'src/app/shared/models/proyecto-formativo.model ';
import { ProgramaModel } from 'src/app/shared/models/programa.model';
import { NotificationOptions } from 'src/app/shared/models/notification-options.model';
import { NotificationService } from 'src/app/shared/services/notification-service';
import { ProgramaService } from 'src/app/shared/services/programa.service';
import { ProyectoFormativoService } from 'src/app/shared/services/proyecto-formativo.service';

@Component({
  selector: 'app-programa-formativo',
  templateUrl: './programa-formativo.component.html',
  styleUrls: ['./programa-formativo.component.css']
})
export class ProgramaFormativoComponent {
  filesPrograma: FileList | null = null;;
  protected showModalPrograma = false;
  programa: ProgramaModel | null = null;
  programas: ProgramaModel[] = [];
  options: NotificationOptions = { message: "Error de conexión" };

  constructor(
    private notificationService: NotificationService,
    private _programaService: ProgramaService,
    private _proyectoService: ProyectoFormativoService
  ) { }

  ngOnInit(): void {
    this.getPrograma();
    this.getProyecto();
  }
  getPrograma() {
    this._programaService.traerProgramas()
      .subscribe(programa => {
        this.programas = programa;
      }, error => {
        this.notificationService.showNotification(this.options);
      });
  }






  proyectos: ProyectoFormativoModel[] = [];

  @Output() update: EventEmitter<ProyectoFormativoModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;
  pageActual = 0;


  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  actualizar(proyecto: ProyectoFormativoModel) {
    this.update.emit(proyecto);
  }

  eliminar(idProyecto: number) {
    this.delete.emit(idProyecto);
  }

  agregar() {
    this.create.emit();
  }


  /********************************************************* */

  private showModalProyecto = false;

  proyecto: ProyectoFormativoModel = null!;



  getProyecto() {
    this._proyectoService.traerProyecto()
      .subscribe(proyecto => {
        this.proyectos = proyecto;
      }, error => {
        this.notificationService.showNotification(this.options);
      });
  }

  eliminarProyecto(proyectoId: number) {
    this._proyectoService.eliminarProyecto(proyectoId).subscribe(() => {
      this.getProyecto();
    })
  }

  actualizarProyecto(proyecto: ProyectoFormativoModel) {
    this.proyecto = proyecto;
    this.showModalProyecto = true;
  }

  createProyecto() {
    this.proyecto = null!;
    this.showModalProyecto = true;
  }

  guardarProyecto(proyecto: ProyectoFormativoModel) {
    if (proyecto.id) {
      this._proyectoService.actualizarProyecto(proyecto).subscribe(proyecto => {
        this.getProyecto();
        this.reset();
      });
    } else {
      this._proyectoService.crearProyecto(proyecto).subscribe(proyecto => {
        this.getProyecto();
        this.reset();
        console.log('llega asi', proyecto);
      })
    }
  }

  reset() {
    this.proyecto = null!;
    this.showModalProyecto = false;
  }
}

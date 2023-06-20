import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  Inject,
} from '@angular/core';
import {
  NgModel,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EstadoGrupoModel } from '@models/estado-grupo.model';
import { GrupoModel } from '@models/grupo.model';
import { InfraestructuraModel } from '@models/infraestructura.model';
import { JornadaModel } from '@models/jornada.model';
import { NivelFormacionModel } from '@models/nivel-formacion.model';
import { ProgramaModel } from '@models/programa.model';
import { TipoFormacionModel } from '@models/tipo-formacion.model';
import { TipoOfertaModel } from '@models/tipo-oferta.model';
import { TipoGrupoModel } from '@models/tipogrupo.model';
import { AsignacionJornadaGrupoService } from '@services/asignacion-jornada-grupo.service';
import { EstadoGrupoService } from '@services/estado-grupo.service';
import { GruposService } from '@services/grupo.service';
import { InfraestructuraService } from '@services/infraestructura.service';
import { JornadaService } from '@services/jornada.service';
import { NivelFormacionService } from '@services/nivel-formacion.service';
import { NotificationService } from '@services/notification-service';
import { ProgramaService } from '@services/programa.service';
import { TipoFormacionService } from '@services/tipo-formacion.service';
import { TipoGrupoService } from '@services/tipo-grupo.service';
import { TipoOfertaService } from '@services/tipo-oferta.service';
// import { JornadaService } from '@services/jornada.service';

import { debounceTime } from 'rxjs/operators';
import { GrupoInfraFormComponent } from '../grupo-infra-form/grupo-infra-form.component';


@Component({
  selector: 'app-grupos-modal',
  templateUrl: './grupos-modal.component.html',
  styleUrls: ['./grupos-modal.component.css'],
})
export class GruposModalComponent {

  programas: ProgramaModel[] = [];
  niveles: NivelFormacionModel[] = [];
  tipoFormaciones: TipoFormacionModel[] = [];
  estadoGrupos: EstadoGrupoModel[] = [];
  tipoOfertas: TipoOfertaModel[] = [];
  tipoGrupos: TipoGrupoModel[] = [];

  idTipoGrupo: number = 0;
  idPrograma: number = 0;
  idNivel: number = 0;
  idTipoFormacion: number = 0;
  idEstado: number = 0;
  idTipoOferta: number = 0;

  formGrupo!: UntypedFormGroup;


  showFormHorario: boolean = false;

  horariosInfra: InfraestructuraModel[] = [];

  @Input() infraestructuras: InfraestructuraModel[] = [];



  constructor(
    private notificationService: NotificationService,
    private _tipoGrupoService: TipoGrupoService,
    private _programaService: ProgramaService,
    private _infraestructuraService: InfraestructuraService,
    private _nivelFormacionService: NivelFormacionService,
    private _tipoFormacionService: TipoFormacionService,
    private _estadoService: EstadoGrupoService,
    private _tipoOfertaService: TipoOfertaService,
    private _jornadasService: JornadaService,
    private modal: MatDialog,
    private dialog: MatDialog,
    private _grupoService: GruposService,
    // private dialogRef: MatDialogRef<AreasModalComponent>,
    @Inject(MAT_DIALOG_DATA) public grupo: GrupoModel,
    private formBuilder: UntypedFormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
      this.traerTipoGrupos();
      this.traerProgramas();
      this.traerNivelesFormacion();
      this.traerTipoFormaciones();
      this.traerEstados();
      this.traerTipoOfertas();
      this.setGrupo();

  }

  ngOnViewInit() {
    this.setGrupo();
  }

  get nombreGrupoField() {
    return this.formGrupo.get('nombreGrupo');
  }

  get fechaInicialField() {
    return this.formGrupo.get('fechaInicial');
  }

  get fechaFinalField() {
    return this.formGrupo.get('fechaFinal');
  }

  get observacionField() {
    return this.formGrupo.get('observacion');
  }

  get nombreJornadaField() {
    return this.formGrupo.get('nombreJornada');
  }

  get idTipoGrupoField() {
    return this.formGrupo.get('idTipoGrupo');
  }

  get idProgramaField() {
    return this.formGrupo.get('idPrograma');
  }

  get idNivelField() {
    return this.formGrupo.get('idNivel');
  }

  get idTipoFormacionField() {
    return this.formGrupo.get('idTipoFormacion');
  }

  get idEstadoField() {
    return this.formGrupo.get('idEstado');
  }

  get idTipoOfertaField() {
    return this.formGrupo.get('idTipoOferta');
  }

  // get totalJornadasSeleccionadas() {
  //   return this.jornadasGrupo.filter((j) => j['checked']).length;
  // }


  // setIndexes(grupo: GrupoModel) {
  //   this.idTipoGrupo = grupo.idTipoGrupo;
  //   this.idPrograma = grupo.idPrograma;
  //   this.idNivel = grupo.idNivel;
  //   this.idTipoFormacion = grupo.idTipoFormacion;
  //   this.idEstado = grupo.idEstado;
  //   this.idTipoOferta = grupo.idTipoOferta;
  // }

  // selectIdTipoGrupo(event: any) {
  //   const value: string = event.target.value;
  //   const tipoPrograma: TipoGrupoModel = this.tipoGrupos.find((tipoP) =>
  //     tipoP.nombreTipoGrupo.toLocaleLowerCase() === value.toLocaleLowerCase());
  //   this.idTipoGrupo = tipoPrograma.id;
  // }

  // public jornadaChecked: any[];

  // setLists(grupo: GrupoModel) {
  //   this.horariosInfra = grupo.infraestructuras;
  // }


  traerTipoGrupos() {
    this._tipoGrupoService.traerTipoGrupos().subscribe(
      (tipoGrupo: TipoGrupoModel[]) => {
        this.tipoGrupos = tipoGrupo;
      },
      (error: any) => {
        console.log(error)
        this.notificationService.showNotification({
          message: 'Error de conexión',
          type: 'success',
        });
      }
    );
  }

  traerProgramas() {
    this._programaService.traerProgramas().subscribe(
      (programa: ProgramaModel[]) => {
        this.programas = programa;
      },
      (error: any) => {
        console.log(error)
        this.notificationService.showNotification({
          message: 'Error de conexión',
          type: 'success',
        });
      }
    );
  }

  // traerInfraestructuras() {
  //   this._infraestructuraService.tra().subscribe(
  //     (infraestructura: InfraestructuraModel[]) => {
  //       this.infraestructuras = infraestructura;
  //     },
  //     (error: any) => {
  //       console.log(error)
  //       this.notificationService.showNotification({
  //         message: 'Error de conexión',
  //         type: 'success',
  //       });
  //     }
  //   );
  // }

  traerNivelesFormacion() {
    this._nivelFormacionService.traerNivelesFormacion().subscribe(
      (niveles: NivelFormacionModel[]) => {
        this.niveles = niveles;
      },
      (error: any) => {
        console.log(error)
        this.notificationService.showNotification({
          message: 'Error de conexión',
          type: 'success',
        });
      }
    );
  }

  traerTipoFormaciones() {
    this._tipoFormacionService.traerTipoFormaciones().subscribe(
      (tiposF: TipoFormacionModel[]) => {
        this.tipoFormaciones = tiposF;
      },
      (error: any) => {
        console.log(error)
        this.notificationService.showNotification({
          message: 'Error de conexión',
          type: 'success',
        });
      }
    );
  }

  traerEstados() {
    this._estadoService.traerEstadoGrupos().subscribe(
      (estado: EstadoGrupoModel[]) => {
        this.estadoGrupos = estado;
      },
      (error: any) => {
        console.log(error)
        this.notificationService.showNotification({
          message: 'Error de conexión',
          type: 'success',
        });
      }
    );
  }

  traerTipoOfertas() {
    this._tipoOfertaService.traerTipoOfertas().subscribe(
      (tipoOferta: TipoOfertaModel[]) => {
        this.tipoOfertas = tipoOferta;
      },
      (error: any) => {
        console.log(error)

        this.notificationService.showNotification({
          message: 'Error de conexión',
          type: 'success',
        });
      }
    );
  }

  // traerJornadas() {
  //   this._jornadasService.traerJornada().subscribe(
  //     (jorn: JornadaModel[]) => {
  //       this.jornadas = jorn;
  //     },
  //     (error: any) => {
  //       console.log(error)
  //       this.notificationService.showNotification({
  //         message: 'Error de conexión',
  //         type: 'success',

  //       });
  //     }
  //   );
  // }


  setGrupo() {
    this.formGrupo.patchValue({
      nombreGrupo: this.grupo.nombre,
      fechaInicial: this.grupo.fechaInicialGrupo,
      fechaFinal: this.grupo.fechaFinalGrupo,
      observacion: this.grupo.observacion,
      nombreJornada: this.grupo.nombreJornada,
      idPrograma: this.grupo.programa!.nombrePrograma,

      idTipoGrupo: this.grupo.idTipoGrupo,
      tipogrupo: this.grupo.tipo_grupo,

      idNivel: this.grupo.idNivel,
      nivel: this.grupo.nivel_formacion,

      idTipoFormacion: this.grupo.idTipoFormacion,
      tipoFormacion: this.grupo.tipo_formacion,

      idEstado: this.grupo.idEstado,
      estado: this.grupo.estado_grupo,

      idTipoOferta: this.grupo.idTipoOferta,
      tipoOferta: this.grupo.tipo_oferta,
    });
  }

  private buildForm() {
    this.formGrupo = this.formBuilder.group({
      id: [null],
      nombreGrupo: ['', Validators.required],
      fechaInicial: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      observacion: [''],
      nombreJornada: ['', Validators.required],
      idTipoGrupo: ['', Validators.required],
      idPrograma: ['', Validators.required],
      idNivel: ['', Validators.required],
      idTipoFormacion: ['', Validators.required],
      idEstado: ['', Validators.required],
      idTipoOferta: ['', Validators.required],
    });
    this.formGrupo.valueChanges.pipe(debounceTime(350)).subscribe((data) => {});
  }

  guardarGrupo() {
    this.notificationService.showNotification({
      message: 'Cambios guardados',
      type: 'success',
    });
    var event = this.getGrupo();
    if (event.id) {
      this._grupoService.actualizarGrupo(event).subscribe((response) => {
        console.log(response);
      });
    } else {
      this._grupoService.crearGrupo(event).subscribe((response) => {
        console.log(response);
      });
    }
  }

  private getControl(control: string) {
    return this.formGrupo.controls[control];
  }

  getGrupo(): GrupoModel {
    return {
      id: this.grupo?.id,
      // nombre: this.grupo.iconUrl,
      nombre: this.getControl('nombre').value,
      fechaInicialGrupo: this.getControl('fechaInicialGrupo').value,
      fechaFinalGrupo: this.getControl('fechaFinalGrupo').value,
      observacion: this.getControl('observacion').value,
      nombreJornada: this.getControl('nombreJornada').value,
      idTipoGrupo: this.getControl('idTipoGrupo').value,
      idPrograma: this.getControl('idPrograma').value,
      idNivel: this.getControl('idNivel').value,
      idTipoFormacion: this.getControl('idTipoFormacion').value,
      idEstado: this.getControl('idEstado').value,
      idTipoOferta: this.getControl('idTipoOferta').value,
      horario_infraestructura: this.getControl('horario_infraestructura').value,
      grupos_jornada: this.getControl('grupos_jornada').value,
      // participantes: this.getControl('participantes').value,
    };
  }

  openModalCreate() {
    this.modal.open(GrupoInfraFormComponent, {});
    this.grupo = {} as GrupoModel;
  }


  addInfraestructura(infr: InfraestructuraModel) {
    this.showFormHorario = false;
    this.horariosInfra.push(infr);
  }

  cancelarHorarioInfraestructura() {
    this.showFormHorario = false;
  }

  removeInfraestructura(idInfr: number) {
    const index = this.horariosInfra.findIndex((infr) => infr.id === idInfr);
    this.horariosInfra.splice(index, 1);
  }

}

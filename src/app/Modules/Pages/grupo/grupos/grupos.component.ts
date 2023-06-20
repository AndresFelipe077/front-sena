import {
  Component,
  ViewChild,
  Inject,
  ElementRef,
  OnInit,
  Input,
} from '@angular/core';
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProgramaModel } from 'src/app/shared/models/programa.model';
import { ProyectoFormativoModel } from 'src/app/shared/models/proyecto-formativo.model ';
import { NotificationService } from 'src/app/shared/services/notification-service';
import { ProgramaService } from 'src/app/shared/services/programa.service';
import { ProyectoFormativoService } from 'src/app/shared/services/proyecto-formativo.service';
import { ProyectoFormativoModalComponent } from '../../proyecto-formativo-view/proyecto-formativo-modal/proyecto-formativo-modal.component';
import { ExtendModalComponent } from 'src/app/Modules/Components/extend-modal/extend-modal.component';
import { ExtendModalFiller } from 'src/app/shared/models/extend-modal-content';
import * as $ from 'jquery';
import { GrupoModel } from 'src/app/shared/models/grupo.model';
import { GruposService } from '@services/grupo.service';
import { GruposModalComponent } from '../grupos-modal/grupos-modal.component';
import { NivelFormacionModel } from '@models/nivel-formacion.model';
import { NivelFormacionService } from '@services/nivel-formacion.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import 'slick-carousel';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css'],
})
export class GruposComponent implements OnInit {

  programas: ProgramaModel[] = [];

  programa: any[] = [];

  niveles: NivelFormacionModel[] = [];

  nivelFormacion: any[] = [];

  Names: string[] = [];

  programaIds: any[] = [];

  nivel: NivelFormacionModel[] = [];

  grupos: GrupoModel[] = [];

  grupo!: GrupoModel;

  grupoNames: string[] = [];

  Ids: any[] = [];

  grupoNamesNivel: string[] = [];

  grupoIdsNivel: any[] = [];

  @ViewChild('slickElement') slickElement!: ElementRef;

  constructor(
    private grupoService: GruposService,
    //private dialogRef: MatDialogRef<ExtendModalComponent>,
    private modal: MatDialog,
    private dialog: MatDialog,
    private ProyectoService: ProyectoFormativoService,
    private _programaService: ProgramaService,

    private notificationService: NotificationService,
    private _grupoService: GruposService,
    private _nivelFormacion: NivelFormacionService
  ) {}

  ngOnInit(): void {
    // this.getProyecto();
    this.getGrupo();
    this.getNivelFormacion();
    this.getPrograma();
  }

  openModalUpdate(proyecto: GrupoModel) {
    let dialogRef = this.modal.open(ProyectoFormativoModalComponent, {
      data: proyecto,
    });
  }

  openModalCreate() {
    this.modal.open(GruposModalComponent, {});
    this.grupo = {} as GrupoModel;
  }

  openModalCreate1() {

    this.filler = [
      {

        fieldName: "Nombrasdassde",
        uppercase: true,

      },
      {
        fieldName: "Codigo",
        placeholder: "qweqewq"

      },
      {
        fieldName: "Programa",
        type: "select",
        data: this.programa,
      },
      {
        fieldName: "Nivel de formación",
        type: "select",
        data: this.nivelFormacion,


      },
      {
        fieldName: "Numero de raps",


      },
      {
        fieldName: "Centro de formación",

      },
      {
        fieldName: "Campo que quiero",
        placeholder: "Place holder",
        uppercase: true
      }

    ]

    var pass = { filler: this.filler, title: "Agregar ficha" }
    const dialogRef: MatDialogRef<ExtendModalComponent> = this.dialog.open(ExtendModalComponent, { data: pass });
    this.grupo = {} as GrupoModel;
    console.log("filler de abajo en boton", pass);
    dialogRef.afterClosed().subscribe(data => {

      let grupo: GrupoModel
      console.log("Dialog output:", data);
    });

  }

  openModalUpdate1(grupo: GrupoModel) {


    var dataPlacer: any = [
      grupo.nombre,
      grupo.fechaInicialGrupo,
      grupo.fechaFinalGrupo,
      grupo.observacion,
      grupo.nombreJornada,
      grupo.idTipoGrupo,
      grupo.idPrograma,
      grupo.idNivel,
      grupo.idTipoFormacion,
      grupo.idEstado,
      grupo.idTipoOferta,
      grupo.horario_infraestructura,
      grupo.grupos_jornada,
      grupo.participantes,
    ];



    console.log('update', this.filler);
    var pass = { filler: this.filler, title: 'Agregar ficha', update: true };
    const dialogRef: MatDialogRef<ExtendModalComponent> = this.dialog.open(
      ExtendModalComponent,
      { data: pass }
    );
    this.grupo = {} as GrupoModel;
    console.log('filler de abajo en boton', pass);

    dialogRef.afterClosed().subscribe((data) => {
      let proyecto: ProyectoFormativoModel;
      console.log('Dialog output:', data);
    });
  }

  getGrupo() {
    this._grupoService.traerGrupos()
      .subscribe(grupo => {
        this.grupos = grupo;
      }, error => {
        console.log(error)
        // this.notificationService.showNotification(this.options);
      });
  }

  deleteGrupo(grupoId: number) {
    this._grupoService.eliminarGrupo(grupoId).subscribe(() => {
      this.getGrupo();
    });
  }

  reset() {
    this.grupo = {} as GrupoModel;
    //this.showModalProyecto = false;
  }

  filler: ExtendModalFiller[] = [];



  getPrograma() {
    this._programaService.traerProgramas()
      .subscribe((programa: ProgramaModel[]) => {
        this.programas = programa;
        this.Names = this.programas.map(programa => programa.nombrePrograma)
        this.Ids = this.programas.map(programa => programa.id || "")

        this.programa = this.Names.map((item, index) => ({
          data: item.toString(),
          dataId: this.Ids[index]
        }));
        console.log(this.programa);

        console.log("filler de abajo", this.filler);

      }, error => {
        this.notificationService.showNotification({ message: 'Error de conexión' });
      });
  }

  getNivelFormacion() {
    this._nivelFormacion.traerNivelesFormacion()
      .subscribe((nivel: NivelFormacionModel[]) => {
        this.niveles = nivel;
        this.Names = this.niveles.map(nivel => nivel.nivel)
        this.Ids = this.niveles.map(nivel => nivel.id || "")

        this.nivelFormacion = this.Names.map((item, index) => ({
          data: item.toString(),
          dataId: this.Ids[index]
        }));
        console.log(this.nivelFormacion);

      }, error => {
        this.notificationService.showNotification({ message: 'Error de conexión' });
      });
  }


  guardarGrupo(grupo: GrupoModel) {
    if (grupo.id) {
      this._grupoService.actualizarGrupo(grupo).subscribe(proyecto => {
        this.getGrupo();
        this.reset();
      });
    } else {
      this._grupoService.crearGrupo(grupo).subscribe(proyecto => {
        this.getGrupo();
        this.reset();
        console.log('llega asi', proyecto);
      })
    }
  }





}

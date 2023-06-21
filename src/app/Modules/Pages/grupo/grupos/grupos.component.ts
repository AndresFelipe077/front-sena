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
import { TipoGrupoModel } from '@models/tipogrupo.model';
import { TipoFormacionModel } from '@models/tipo-formacion.model';
import { EstadoGrupoModel } from '@models/estado-grupo.model';
import { TipoOfertaModel } from '@models/tipo-oferta.model';
import { TipoGrupoService } from '@services/tipo-grupo.service';
import { TipoFormacionService } from '@services/tipo-formacion.service';
import { EstadoGrupoService } from '@services/estado-grupo.service';
import { TipoOfertaService } from '@services/tipo-oferta.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css'],
})
export class GruposComponent implements OnInit {

  tipoGrupos: TipoGrupoModel[] = [];

  tipoGrupo: any;

  programas: ProgramaModel[] = [];

  programa: any[] = [];

  niveles: NivelFormacionModel[] = [];

  nivelFormacion: any[] = [];

  tipoFormaciones: TipoFormacionModel[] = [];

  tipoFormacion: any[] = [];

  estados: EstadoGrupoModel[] = [];

  estado: any[] = [];

  tipoOfertas: TipoOfertaModel[] = [];

  tipoOferta: any[] = [];


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
    private _nivelFormacion: NivelFormacionService,
    private _tipoGrupoService: TipoGrupoService,
    private _tipoFormacionService: TipoFormacionService,
    private _estadoGrupo: EstadoGrupoService,
    private _tipoOferta: TipoOfertaService,

  ) {}

  ngOnInit(): void {
    // this.getProyecto();
    this.getGrupo();
    this.getTipoGrupo();
    this.getNivelFormacion();
    this.getPrograma();
    this.getTipoFormacion();
    this.getTipoOferta();
    this.getEstadoGrupo();
    this.getTipoOferta();
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
        fieldName: "TipoGrupo",
        type: "select",
        data: this.tipoGrupo,
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


  getTipoGrupo() {
    this._tipoGrupoService.traerTipoGrupos()
      .subscribe((tipoGrupo: TipoGrupoModel[]) => {
        this.tipoGrupos = tipoGrupo;
        this.Names = this.tipoGrupos.map(tipoGrupo => tipoGrupo.nombreTipoGrupo)
        this.Ids = this.tipoGrupos.map(tipoGrupo => tipoGrupo.id || "")

        this.tipoGrupo = this.Names.map((item, index) => ({
          data: item.toString(),
          dataId: this.Ids[index]
        }));
        console.log(this.tipoGrupo);

        console.log("filler de abajo", this.filler);

      }, error => {
        this.notificationService.showNotification({ message: 'Error de conexión' });
      });
  }

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

  getTipoFormacion() {
    this._tipoFormacionService.traerTipoFormaciones()
      .subscribe((tipoFormacion: TipoFormacionModel[]) => {
        this.tipoFormaciones = tipoFormacion;
        this.Names = this.tipoFormaciones.map(tipoFormacion => tipoFormacion.nombreTipoFormacion)
        this.Ids = this.tipoFormaciones.map(tipoFormacion => tipoFormacion.id || "")

        this.tipoFormacion = this.Names.map((item, index) => ({
          data: item.toString(),
          dataId: this.Ids[index]
        }));
        console.log(this.tipoFormacion);

      }, error => {
        this.notificationService.showNotification({ message: 'Error de conexión' });
      });
  }

  getEstadoGrupo() {
    this._estadoGrupo.traerEstadoGrupos()
      .subscribe((estadoGrupo: EstadoGrupoModel[]) => {
        this.estados = estadoGrupo;
        this.Names = this.estados.map(estado => estado.nombreEstado)
        this.Ids = this.estados.map(estado => estado.id || "")

        this.estado = this.Names.map((item, index) => ({
          data: item.toString(),
          dataId: this.Ids[index]
        }));
        console.log(this.tipoFormacion);

      }, error => {
        this.notificationService.showNotification({ message: 'Error de conexión' });
      });
  }

  getTipoOferta() {
    this._tipoOferta.traerTipoOfertas()
      .subscribe((tipoOferta: TipoOfertaModel[]) => {
        this.tipoOfertas = tipoOferta;
        this.Names = this.tipoOfertas.map(tipoOferta => tipoOferta.nombreOferta)
        this.Ids = this.tipoOfertas.map(tipoOferta => tipoOferta.id || "")

        this.tipoOferta = this.Names.map((item, index) => ({
          data: item.toString(),
          dataId: this.Ids[index]
        }));
        console.log(this.tipoFormacion);

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

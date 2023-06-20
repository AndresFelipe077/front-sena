import { Component, ViewChild, Inject, ElementRef } from '@angular/core';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgramaService } from 'src/app/shared/services/programa.service';
import 'slick-carousel';
import * as $ from 'jquery';
import { ProyectoFormativoModalComponent } from '../proyecto-formativo-modal/proyecto-formativo-modal.component';
import { ProyectoFormativoModel } from 'src/app/shared/models/proyecto-formativo.model ';
import { ProyectoFormativoService } from 'src/app/shared/services/proyecto-formativo.service';
import { NotificationService } from 'src/app/shared/services/notification-service';
import { ExtendModalComponent } from 'src/app/Modules/Components/extend-modal/extend-modal.component';
import { ExtendModalFiller } from 'src/app/shared/models/extend-modal-content';
import { ProgramaModel } from 'src/app/shared/models/programa.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-proyecto-formativo',
  templateUrl: './proyecto-formativo.component.html',
  styleUrls: ['./proyecto-formativo.component.css'],

})
export class ProyectoFormativoComponent {

  Programas: ProgramaModel[] = [];
  proyecto!: ProyectoFormativoModel;
  proyectos: ProyectoFormativoModel[] = [];
  programaNames: string[] = [];
  programaIds: any[] = [];

  @ViewChild('slickElement') slickElement!: ElementRef;
  porcentajeNumericos: number[];
  colores: string[];

  constructor(
    private programaService: ProgramaService,
    //private dialogRef: MatDialogRef<ExtendModalComponent>,
    private modal: MatDialog,
    private dialog: MatDialog,
    private ProyectoService: ProyectoFormativoService,
    private NotificationService: NotificationService
  ) {
    this.porcentajeNumericos = [1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    this.colores = [];
    for (let i = 0; i < this.porcentajeNumericos.length; i++) {
      const currentPorcentaje = this.porcentajeNumericos[i];
      let currentColor = "";

      if (currentPorcentaje < 16.6) {
        currentColor = "#A92020";
      } else if (currentPorcentaje < 33.2 && currentPorcentaje > 16.6) {
        currentColor = "#F8762D";
      } else if (currentPorcentaje < 49.8 && currentPorcentaje > 33.2) {
        currentColor = "#C68F02";
      } else if (currentPorcentaje < 66.4 && currentPorcentaje > 49.8) {
        currentColor = "#C1A928";
      } else if (currentPorcentaje < 83.3 && currentPorcentaje > 66.4) {
        currentColor = "#8C9F15";
      } else if (currentPorcentaje <= 100 && currentPorcentaje > 83.3) {
        currentColor = "#54A920";
      }
      this.colores.push(currentColor);
    }
  }
  ////////////////////////////////////////////////////////////////
  test: any = [
    {
      fieldname: "qwe"
    }
  ]





  openModalUpdate(proyecto: ProyectoFormativoModel) {
    let dialogRef = this.modal.open(ProyectoFormativoModalComponent, {
      data: proyecto,




    });
  }

  openModalCreate() {
    this.modal.open(ProyectoFormativoModalComponent, {});
    this.proyecto = {} as ProyectoFormativoModel;

  }

  openModalCreate1() {
    var pass = { filler: this.filler, title: "Agregar proyecto formativo" }
    const dialogRef: MatDialogRef<ExtendModalComponent> = this.dialog.open(ExtendModalComponent, { data: pass });
    this.proyecto = {} as ProyectoFormativoModel;
    console.log("filler de abajo en boton", pass);
    dialogRef.afterClosed().subscribe(data => {

      let proyecto: ProyectoFormativoModel
      console.log("Dialog output:", data);
    });

  }

  openModalUpdate1(proyecto: ProyectoFormativoModel) {
    var dataPlacer: any = [proyecto.nombre, proyecto.codigo, proyecto.tiempoEstimado, proyecto.numeroTotalRaps, proyecto.idCentroFormacion]
    this.filler.forEach((item, i) => {
      item.dataPlacer = dataPlacer[i]; // Asignar nuevos valores a la propiedad "d"
    });

    console.log("update",this.filler)
    var pass = { filler: this.filler, title: "Agregar proyecto formativo", update: true }
    const dialogRef: MatDialogRef<ExtendModalComponent> = this.dialog.open(ExtendModalComponent, { data: pass });
    this.proyecto = {} as ProyectoFormativoModel;
    console.log("filler de abajo en boton", pass);


    dialogRef.afterClosed().subscribe(data => {

      let proyecto: ProyectoFormativoModel
      console.log("Dialog output:", data);


    })
  }

  /////////////////////////////////////////////
  getProyecto() {
    this.ProyectoService.traerProyecto()
      .subscribe(proyecto => {
        this.proyectos = proyecto;
      }, error => {
        this.NotificationService.showNotification({ message: "Error de conexión" });
      });
  }

  deleteProyecto(proyectoId: number) {
    this.ProyectoService.eliminarProyecto(proyectoId).subscribe(() => {
      this.getProyecto();
    })
  }



  guardarProyecto(proyecto: ProyectoFormativoModel) {
    if (proyecto.id) {
      this.ProyectoService.actualizarProyecto(proyecto).subscribe(proyecto => {
        this.getProyecto();
        this.reset();
      });
    } else {
      this.ProyectoService.crearProyecto(proyecto).subscribe(proyecto => {
        this.getProyecto();
        this.reset();
        console.log('llega asi', proyecto);
      })
    }
  }

  reset() {
    this.proyecto = {} as ProyectoFormativoModel;
    //this.showModalProyecto = false;
  }



  filler: ExtendModalFiller[] = [];

  ngOnInit(): void {
    this.getProyecto();
    this.getPrograma();

  }


  getPrograma() {
    this.programaService.traerProgramas()
      .subscribe((programa: ProgramaModel[]) => {
        this.Programas = programa;
        this.programaNames = this.Programas.map(programa => programa.nombrePrograma)
        this.programaIds = this.Programas.map(programa => programa.id || "")

        let dataFill = this.programaNames.map((item, index) => ({
          data: item.toString(),
          dataId: this.programaIds[index]
        }));
        console.log(dataFill);

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
            data: dataFill


          },
          {
            fieldName: "Tiempo estimado",


          },
          {
            fieldName: "Numero de raps",


          },
          {
            fieldName: "Centro de formación",

          }
          , {
            fieldName: "Campo que quiero",
            placeholder: "Place holder",
            uppercase: true
          }

        ]
        console.log("filler de abajo", this.filler);


      }, error => {
        this.NotificationService.showNotification({ message: 'Error de conexión' });
      });
  }



  ngAfterViewChecked(): void {




    if (this.slickElement.nativeElement.children.length > 3) {
      $(this.slickElement.nativeElement).slick({
        rows: 2,
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 1250,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              rows: 3
            }
          },
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              rows: 2
            }
          },
          {
            breakpoint: 730,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              rows: 1
            }
          }
        ]
      });
    }
  }

}

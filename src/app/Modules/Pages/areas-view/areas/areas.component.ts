import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked, OnDestroy, inject } from '@angular/core';
import { AreaModel } from 'src/app/shared/models/area.model';
import { AreaService } from 'src/app/shared/services/area.service';
import { NotificationService } from 'src/app/shared/services/notification-service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import 'slick-carousel';
import * as $ from 'jquery';
import { ExtendModalComponent } from '../../../Components/extend-modal/extend-modal.component';
import { MatDialogConfig } from '@angular/material/dialog';
import { AreasModalComponent } from '../areas-modal/areas-modal.component';
import { ExtendModalFiller } from 'src/app/shared/models/extend-modal-content';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit, AfterViewChecked, OnDestroy {


  @ViewChild('slickElement') slickElement!: ElementRef;
  protected cache: Map<number, { areas: AreaModel[] | null }> = new Map<number, { areas: AreaModel[] | null }>();
  protected showFormArea: boolean = false;
  protected formTitle: string = "";
  protected showResultadoBusqueda: boolean = false;
  protected resultadoBusqueda: AreaModel | null = null;
  area: AreaModel | null = null;
  areas: AreaModel[] = [];
  private subscription: Subscription | undefined;
  filler : ExtendModalFiller[] = [];

  constructor(
    //private dialogRef: MatDialogRef<AreasComponent>,
    //private modalRef: MatDialogRef<ExtendModalComponent>,
    private modal: MatDialog,
    private notificationService: NotificationService,
    private _areaService: AreaService,
    

  ) { }


  ngOnInit() {
    this.iniciarCache();
    this.getAreas();
  }

  iniciarCache() {
    this.cache.set(0, { areas: null });
  }
  getAreas() {
    const cacheAreas = this.cache.get(0)!.areas;
    if (cacheAreas !== null) {
      if (this.areas !== cacheAreas) {
        this.areas = cacheAreas;

      }
    } else {
      this._areaService.traerAreas().subscribe(
        area => {
          this.areas = area;
          this.cache.get(0)!.areas = this.areas;
          console.log(this.areas)
        },
        error => {
          this.notificationService.showNotification({ message: "Error de conexión" });
        }
      );
    }
  }
  deleteArea(event: number) {
    this._areaService.borrarArea(event).subscribe(() => {
      this.getAreas();

    })
  }
  ///////////////////////////////

  dialogConfig = new MatDialogConfig();


  openModalCreate() {
    this.modal.open(AreasModalComponent);
    this.area = {} as AreaModel;
  }

  openModalUpdate(area: AreaModel) {
    let dialogRef = this.modal.open(AreasModalComponent, {
      data: area,
      panelClass: "foo"

    });
  }
/////////////////////////////////////////////



  actualizarArea(event: AreaModel) {
    this.formTitle = 'Editar área';
    this.area = event;
    this.showFormArea = true;
  }

  crearArea() {
    this.showFormArea = true;
    this.formTitle = 'Añadir área';
  }

 
  buscarArea(event: AreaModel) {
    this.showResultadoBusqueda = true;
    this.resultadoBusqueda = event;
  }
  closeBusqueda() {
    this.showResultadoBusqueda = false;
    this.resultadoBusqueda = null;
  }

  ngAfterViewChecked(): void {
    if (this.slickElement.nativeElement.children.length > 3) {
      $(this.slickElement.nativeElement).slick({
        rows: 2,
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1250,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              rows: 2
            }
          },
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
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
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



}
import { Component, Inject } from '@angular/core';
import { Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { AreaModel } from 'src/app/shared/models/area.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/services/notification-service';
import { AreaService } from 'src/app/shared/services/area.service';

@Component({
  selector: 'app-areas-modal',
  templateUrl: './areas-modal.component.html',
  styleUrls: ['./areas-modal.component.css']
})
export class AreasModalComponent {


  formArea!: UntypedFormGroup;


  constructor(

    private notificationService: NotificationService,
    private _areaService: AreaService,
    private dialogRef: MatDialogRef<AreasModalComponent>,
    @Inject(MAT_DIALOG_DATA) public area: AreaModel,
    private formBuilder: UntypedFormBuilder
  ) {

    this.buildForm();

  }

  ngOnInit(): void {
    this.setArea();
  }

  get nombreAreaField() {
    return this.formArea.get('nombreArea');
  }
  get codigoField() {
    return this.formArea.get('codigo');
  }

  setArea() {
    if (this.area) {
      this.formArea.patchValue({
        nombreArea: this.area.nombreArea,
        codigo: this.area.codigo
      });
    }
    console.log("asad",this.area);
    
  }

  private buildForm() {
    this.formArea = this.formBuilder.group({
      id: [0],
      nombreArea: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
    });

    this.formArea.valueChanges
      .pipe(
        debounceTime(350)
      ).subscribe(data => {
      });
  }


  guardarArea() {
    this.notificationService.showNotification({message:"Cambios guardados", type:"succes"})
    var event = this.getArea()
    if (event.id) {
      this._areaService.actualizarArea(event).subscribe(() => {


      });
    } else {
      this._areaService.guardarArea(event).subscribe(() => {


      });
    }
  }




  private getControl(control: string) {
    return this.formArea.controls[control];
  }

  getArea(): AreaModel {
    return {
      id: this.area?.id,
      iconUrl: this.area.iconUrl,
      nombreArea: this.getControl('nombreArea').value,
      codigo: this.getControl('codigo').value
    }
  }
}
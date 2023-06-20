import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreasComponent } from './areas-view/areas/areas.component';
import { ChargeWheelComponent } from '../Components/charge-wheel/charge-wheel.component';
import { ComponentsModule } from '../Components/components.module';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProyectoFormativoModalComponent } from './proyecto-formativo-view/proyecto-formativo-modal/proyecto-formativo-modal.component';
import { ProyectoFormativoComponent } from './proyecto-formativo-view/proyecto-formativo/proyecto-formativo.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AreasModalComponent } from './areas-view/areas-modal/areas-modal.component';
import { MatButtonModule } from '@angular/material/button';

import { GruposComponent } from './grupo/grupos/grupos.component';
import { GruposModalComponent } from './grupo/grupos-modal/grupos-modal.component';

import { Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { NgModel } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';


import { NgSelectModule } from '@ng-select/ng-select';
import { GrupoInfraComponent } from './grupo/grupo-infra/grupo-infra.component';
import { GrupoInfraFormComponent } from './grupo/grupo-infra-form/grupo-infra-form.component';
@NgModule({
  declarations: [
    ProyectoFormativoComponent,
    ProyectoFormativoModalComponent,
    AreasComponent,
    AreasModalComponent,
    GruposComponent,
    GruposModalComponent,
    GrupoInfraComponent,
    GrupoInfraFormComponent


  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule, MatDividerModule, MatIconModule,
    NgSelectModule,

  ]
  , exports: [
    ProyectoFormativoComponent,
    ProyectoFormativoModalComponent,



  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: []
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: []
    }
  ]
})
export class PagesModule { }

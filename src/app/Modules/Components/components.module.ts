import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentesRoutingModule } from './components-routing.module';
import { ChargeWheelComponent } from './charge-wheel/charge-wheel.component';
import { DescripcionComponent } from './descripcion/descripcion.component';
import { ProgramaFormativoComponent } from './programa-formativo/programa-formativo.component';
import { ExtendModalComponent } from './extend-modal/extend-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    ChargeWheelComponent,
    DescripcionComponent,
    ProgramaFormativoComponent,
    ExtendModalComponent,
    
  ],
  imports: [
    CommonModule,
    ComponentesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule

  ],
  exports: [
    ChargeWheelComponent,
    DescripcionComponent,
    ProgramaFormativoComponent,
    ExtendModalComponent
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
export class ComponentsModule { }

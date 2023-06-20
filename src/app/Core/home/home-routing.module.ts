import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChargeWheelComponent } from 'src/app/Modules/Components/charge-wheel/charge-wheel.component';
import { HomeComponent } from './home.component';
import { ProgramaFormativoComponent } from 'src/app/Modules/Components/programa-formativo/programa-formativo.component';
import { RouterOutlet } from '@angular/router';

const routes: Routes = [
 /* {
    path: 'programa',
    component: ProgramaFormativoComponent
    /*loadChildren: () =>
      import("src/app/Modules/Components/charge-wheel/charge-wheel.component").then(
        (m) => m.ChargeWheelComponent
      ),
  },
  {
    path:"proyecto",
    component: ChargeWheelComponent
  },
  {
    path:"",
    component: ChargeWheelComponent
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

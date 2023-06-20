import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { AuthModule } from './auth/auth.module';

import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,


  ],
  exports: [
    NotificationComponent
  ]
})
export class CoreModule { }

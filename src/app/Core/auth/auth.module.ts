import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { CompanyComponent } from './company/company.component';
import { HomeModule } from '../home/home.module';
import { HomeRoutingModule } from '../home/home-routing.module';


@NgModule({
  declarations: [
    CompanyComponent,
    LoginComponent
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HomeRoutingModule

  ],
  exports:[
    LoginComponent,
    CompanyComponent
  ]
})
export class AuthModule { }

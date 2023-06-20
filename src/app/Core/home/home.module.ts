import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FooterComponent } from './footer/footer.component';
import { CoreModule } from '../core.module';
import { ComponentsModule } from 'src/app/Modules/Components/components.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home.component';
import { ProgramaFormativoComponent } from 'src/app/Modules/Components/programa-formativo/programa-formativo.component';
import { PagesModule } from 'src/app/Modules/Pages/pages.module';





@NgModule({
  declarations: [
  FooterComponent,
  NavbarComponent,
  HomeComponent,
  NavbarComponent,


  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule,
    PagesModule,
  ],
  exports:[HomeComponent,
  NavbarComponent]
})
export class HomeModule { }

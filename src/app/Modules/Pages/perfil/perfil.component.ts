import { Component,OnInit } from '@angular/core';
import { PersonaModel } from 'src/app/shared/models/persona.model';
import { CoreService } from 'src/app/shared/services/core.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  constructor(
    private coreService: CoreService,
  ) { }
  public persona: PersonaModel | null = null;
  ngOnInit(): void {
   this.coreService.getUserAuthenticated();

    this.coreService.persona.subscribe((persona) => {
      this.persona = persona;
    });
  }

}

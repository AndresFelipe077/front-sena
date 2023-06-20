import { Component,OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivationCompanyUserModel } from 'src/app/shared/models/activation-company-user.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {

  @Input() activationCompanyUsers!: ActivationCompanyUserModel[];
  @Output() onSelect: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  getCompanyName(activationCompanyUser: ActivationCompanyUserModel) {
    return activationCompanyUser.company!.razonSocial;
  }

  getCompanyLogoCSS(activationCompanyUser: ActivationCompanyUserModel) {
    return activationCompanyUser.company!.rutaLogoUrl;
  }

  selectCompany(activationCompanyUser: ActivationCompanyUserModel) {
    this.onSelect.emit(activationCompanyUser.id);
  }

  getRole(activationCompanyUser: ActivationCompanyUserModel) {
    const roles = activationCompanyUser.roles.map(rol => rol.name).join(',');
    return roles ? roles : 'Sin permisos';
  }

}

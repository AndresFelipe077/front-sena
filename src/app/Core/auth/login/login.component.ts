import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivationCompanyUserModel } from 'src/app/shared/models/activation-company-user.model';
import { CoreService } from 'src/app/shared/services/core.service';
import { NotificationService } from 'src/app/shared/services/notification-service';
import { NotificationOptions } from 'src/app/shared/models/notification-options.model';


const KEY_CODE_ENTER = 13;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  formLogin!: UntypedFormGroup;


  activationCompanyUsers: ActivationCompanyUserModel[] = [];
  options: NotificationOptions = { message: "Usuario o contraseña inválidos" };
  options1: NotificationOptions = { message: "Inicio de sesión correcto",type: "success"};
  constructor(
    private formBuilder: UntypedFormBuilder,
    private _coreService: CoreService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this._coreService.logout();
    this.buildFormLogin();
  }

  showNotification():void{
    this.notificationService.showNotification({message:"Contacte con un administrador.", type : "warning",position:["right", "top"]})
  }

  ngOnInit(): void {

  }

  private buildFormLogin() {
    this.formLogin = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  get usuarioField() {
    return this.formLogin.get('usuario');
  }
  get passwordField() {
    return this.formLogin.get('password');
  }

  onEnter(event: any) {
    if (event.keyCode == KEY_CODE_ENTER) {
      this.login();
    }
  }

  selectCompany(idActivationUser: number) {

    this._coreService.post<any>('user_company/' + idActivationUser).subscribe(res => {
      this.router.navigate(['/dashboard']);
    });
  }

  login() {
    if (this.formLogin.valid) {
      this._coreService.login(
        this.formLogin.get('usuario')!.value,
        this.formLogin.get('password')!.value,
        (response: ActivationCompanyUserModel[]) => {

          if (response.length < 1) {
            this.notificationService.showNotification( {message:"No tiene un perfil activo", position:["right"]});
          } else if (response.length === 1) {
            this.selectCompany(response[0].id!);
            this.notificationService.showNotification(this.options1);
          } else if (response.length > 1) {
            this.activationCompanyUsers = response;
            this.notificationService.showNotification(this.options1);
          }
        },
        (e: any) => {
          if (e.status === 401 || e.status === 400) {
            this.notificationService.clearNotification();
            this.notificationService.showNotification(this.options);
          }
          if(e.status === 422){
            this.notificationService.clearNotification();
            this.notificationService.showNotification(this.options);
          }
        }
      );
    }
  }



  get showListCompanies() {
    return this.activationCompanyUsers.length > 1;
  }

  recoverPassword() {

  }

}



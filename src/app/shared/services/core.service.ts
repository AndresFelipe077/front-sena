import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModel } from '../models/auth.model';
import { EmpresaModel } from '../models/empresa.model';
import { PersonaModel } from '../models/persona.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ActivationCompanyUserModel } from '../models/activation-company-user.model';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

const API_URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  public persona: Subject<PersonaModel> = new Subject<PersonaModel>;
  public empresa: Subject<EmpresaModel> = new Subject<EmpresaModel>;
  public permissions: Subject<string> = new Subject<string>;
  public check: Subject<boolean> = new Subject<boolean>;
  check$ = this.check.asObservable();

  constructor(
    private httpClient: HttpClient,
    private _router: Router,
    private _tokenService: HttpXsrfTokenExtractor
  ) { }

  public get<T>(url: String, data: String | Object = ''): Observable<T> {
    return this.httpClient.get<T>(
      API_URL + url + this.getData(data),
      this.getConfig()
    );
  }

  private getConfig() {

    const header = {
      'Accept': 'application/json'
    };
    const token = this._tokenService.getToken();



    return { withCredentials: true, headers: new HttpHeaders(header) };
  }

  public post<T>(url: String, data: Object | FormData = {}): Observable<T> {
    return this.httpClient.post<T>(
      API_URL + url,
      data,
      this.getConfig()
    );
  }

  public put<T>(url: String, data: any = {}): Observable<T> {
    if (typeof (data.append) === 'function') {
      data.append('_method', 'PUT');
    } else {
      data._method = 'PUT';
    }
    return this.httpClient.post<T>(API_URL + url, data, this.getConfig());
  }

  public delete(url: String) {
    return this.httpClient.delete(API_URL + url, this.getConfig());
  }

  login(user: string, password: string, success: CallableFunction, error: CallableFunction) {
    this.httpClient.get(API_URL + 'sanctum/csrf-cookie').subscribe(res => {
      this.post<ActivationCompanyUserModel[]>('login', {
        email: user,
        password: password
      }).subscribe(response => {
        success(response);
      }, err => {
        error(err);
      });
    });
  }

  public getUserAuthenticated() {
    this.get<AuthModel>('user').subscribe(auth => {
      this.persona.next(auth.user);
      this.permissions.next(auth.permission);
      this.empresa.next(auth.userActivate.company!);
      this.check.next(true)
    }, errs => {
      this.logout();
      this.check.next(false)
    });
  }

  logout() {
    this.persona.next(null!);
    this.empresa.next(null!);
    this.permissions.next('');

    this.post('logout').subscribe(res => {
      this._router.navigate(['/login']);
    }, err => {
      this._router.navigate(['/login']);
    });
  }

  private getData(data: String | Object): String {
    let dataUrl = '?';
    if (typeof (data) === 'string') {
      if (data.trim() === '') {
        return '';
      }
      dataUrl += data;
    } else {
      const keys = Object.keys(data);
      keys.forEach((key, index) => {
        if (index > 0) {
          dataUrl += '&';
        }
        dataUrl += '${key}=${data[key]}';
      });
    }
    return dataUrl.replace('??', '?').trim();
  }
}

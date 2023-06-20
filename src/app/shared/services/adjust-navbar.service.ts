import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdjustNavbarService {

  private navbar_adjustment = new Subject();
  adjust$= this.navbar_adjustment.asObservable();
  constructor() { }
  
  Adjust_navbar(res:string){
    this.navbar_adjustment.next(res)
  }
}

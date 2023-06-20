import { Injectable,Output,EventEmitter,Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioToggleService {
  @Output() ChaneColor:EventEmitter<any> =new EventEmitter();
}

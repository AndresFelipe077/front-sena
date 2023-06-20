import { Component, Input } from '@angular/core';
import { ChargeWheelFiller } from 'src/app/shared/models/charge-wheel-filler';

@Component({
  selector: 'app-charge-wheel',
  templateUrl: './charge-wheel.component.html',
  styleUrls: ['./charge-wheel.component.css']
})
export class ChargeWheelComponent {
  porcentajeNumerico: number[];
  colores: string[];
  @Input() filler: ChargeWheelFiller[] = [];

  
  constructor() {
    this.porcentajeNumerico = [83, 55, 67,10,5,35];
    this.colores = [];
    for (let i = 0; i < this.porcentajeNumerico.length; i++) {
      const currentPorcentaje = this.porcentajeNumerico[i];
      let currentColor = "";

      if (currentPorcentaje < 16.6) {
        currentColor = "#A92020";
      } else if (currentPorcentaje < 33.2 && currentPorcentaje > 16.6) {
        currentColor = "#F8762D";
      } else if (currentPorcentaje < 49.8 && currentPorcentaje > 33.2) {
        currentColor = "#C68F02";
      } else if (currentPorcentaje < 66.4 && currentPorcentaje > 49.8) {
        currentColor = "#C1A928";
      } else if (currentPorcentaje < 83.3 && currentPorcentaje > 66.4) {
        currentColor = "#8C9F15";
      } else if (currentPorcentaje <= 100 && currentPorcentaje > 83.3) {
        currentColor = "#54A920";
      }
      this.colores.push(currentColor);
    }
  }
}
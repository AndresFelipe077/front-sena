import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaMonitoreoColoresComponent } from './guia-monitoreo-colores.component';

describe('GuiaMonitoreoColoresComponent', () => {
  let component: GuiaMonitoreoColoresComponent;
  let fixture: ComponentFixture<GuiaMonitoreoColoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuiaMonitoreoColoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuiaMonitoreoColoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

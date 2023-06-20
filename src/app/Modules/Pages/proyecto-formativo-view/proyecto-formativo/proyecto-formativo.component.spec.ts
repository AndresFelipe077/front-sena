import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoFormativoComponent } from './proyecto-formativo.component';

describe('ProyectoFormativoComponent', () => {
  let component: ProyectoFormativoComponent;
  let fixture: ComponentFixture<ProyectoFormativoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProyectoFormativoComponent]
    });
    fixture = TestBed.createComponent(ProyectoFormativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

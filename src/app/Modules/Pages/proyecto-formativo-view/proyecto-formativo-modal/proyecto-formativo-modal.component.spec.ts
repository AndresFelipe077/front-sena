import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoFormativoModalComponent } from './proyecto-formativo-modal.component';

describe('ProyectoFormativoModalComponent', () => {
  let component: ProyectoFormativoModalComponent;
  let fixture: ComponentFixture<ProyectoFormativoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProyectoFormativoModalComponent]
    });
    fixture = TestBed.createComponent(ProyectoFormativoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

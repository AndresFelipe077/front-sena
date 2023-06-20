import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoInfraComponent } from './grupo-infra.component';

describe('GrupoInfraComponent', () => {
  let component: GrupoInfraComponent;
  let fixture: ComponentFixture<GrupoInfraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrupoInfraComponent]
    });
    fixture = TestBed.createComponent(GrupoInfraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

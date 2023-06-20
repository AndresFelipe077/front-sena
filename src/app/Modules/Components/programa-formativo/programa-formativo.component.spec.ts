import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaFormativoComponent } from './programa-formativo.component';

describe('ProgramaFormativoComponent', () => {
  let component: ProgramaFormativoComponent;
  let fixture: ComponentFixture<ProgramaFormativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramaFormativoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramaFormativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

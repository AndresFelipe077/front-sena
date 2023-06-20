import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroSearchComponent } from './filtro-search.component';

describe('FiltroSearchComponent', () => {
  let component: FiltroSearchComponent;
  let fixture: ComponentFixture<FiltroSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

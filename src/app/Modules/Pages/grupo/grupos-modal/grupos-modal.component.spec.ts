import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposModalComponent } from './grupos-modal.component';

describe('GruposModalComponent', () => {
  let component: GruposModalComponent;
  let fixture: ComponentFixture<GruposModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GruposModalComponent]
    });
    fixture = TestBed.createComponent(GruposModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

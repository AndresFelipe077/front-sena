import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasModalComponent } from './areas-modal.component';

describe('AreasModalComponent', () => {
  let component: AreasModalComponent;
  let fixture: ComponentFixture<AreasModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreasModalComponent]
    });
    fixture = TestBed.createComponent(AreasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

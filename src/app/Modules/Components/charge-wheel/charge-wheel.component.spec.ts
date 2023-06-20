import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeWheelComponent } from './charge-wheel.component';

describe('ChargeWheelComponent', () => {
  let component: ChargeWheelComponent;
  let fixture: ComponentFixture<ChargeWheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeWheelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargeWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

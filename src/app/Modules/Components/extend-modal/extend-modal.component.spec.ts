import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendModalComponent } from './extend-modal.component';

describe('ExtendModalComponent', () => {
  let component: ExtendModalComponent;
  let fixture: ComponentFixture<ExtendModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtendModalComponent]
    });
    fixture = TestBed.createComponent(ExtendModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

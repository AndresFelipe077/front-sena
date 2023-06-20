import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElipseInformationComponent } from './elipse-information.component';

describe('ElipseInformationComponent', () => {
  let component: ElipseInformationComponent;
  let fixture: ComponentFixture<ElipseInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElipseInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElipseInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAppointmentPanelComponent } from './doctor-appointment-panel.component';

describe('DoctorAppointmentPanelComponent', () => {
  let component: DoctorAppointmentPanelComponent;
  let fixture: ComponentFixture<DoctorAppointmentPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorAppointmentPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAppointmentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

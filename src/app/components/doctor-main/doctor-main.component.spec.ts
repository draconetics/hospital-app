import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorMainComponent } from './doctor-main.component';

describe('DoctorMainComponent', () => {
  let component: DoctorMainComponent;
  let fixture: ComponentFixture<DoctorMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

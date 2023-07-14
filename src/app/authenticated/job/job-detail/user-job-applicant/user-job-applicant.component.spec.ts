import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserJobApplicantComponent } from './user-job-applicant.component';

describe('UserJobApplicantComponent', () => {
  let component: UserJobApplicantComponent;
  let fixture: ComponentFixture<UserJobApplicantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserJobApplicantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserJobApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

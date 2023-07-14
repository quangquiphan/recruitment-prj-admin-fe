import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyGeneralComponent } from './company-general.component';

describe('CompanyGeneralComponent', () => {
  let component: CompanyGeneralComponent;
  let fixture: ComponentFixture<CompanyGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

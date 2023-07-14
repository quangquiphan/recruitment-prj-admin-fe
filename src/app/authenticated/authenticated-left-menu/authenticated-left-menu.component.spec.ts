import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedLeftMenuComponent } from './authenticated-left-menu.component';

describe('AuthenticatedLeftMenuComponent', () => {
  let component: AuthenticatedLeftMenuComponent;
  let fixture: ComponentFixture<AuthenticatedLeftMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticatedLeftMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticatedLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

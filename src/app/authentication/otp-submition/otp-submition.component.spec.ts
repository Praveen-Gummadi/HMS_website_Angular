import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpSubmitionComponent } from './otp-submition.component';

describe('OtpSubmitionComponent', () => {
  let component: OtpSubmitionComponent;
  let fixture: ComponentFixture<OtpSubmitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpSubmitionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpSubmitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

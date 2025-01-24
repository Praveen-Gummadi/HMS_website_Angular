import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilelayoutComponent } from './profilelayout.component';

describe('ProfilelayoutComponent', () => {
  let component: ProfilelayoutComponent;
  let fixture: ComponentFixture<ProfilelayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilelayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilelayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

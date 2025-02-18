import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialsignupComponent } from './partialsignup.component';

describe('PartialsignupComponent', () => {
  let component: PartialsignupComponent;
  let fixture: ComponentFixture<PartialsignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartialsignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartialsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

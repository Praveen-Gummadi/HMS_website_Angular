import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelOrderDialogComponent } from './cancel-order-dialog.component';

describe('CancelOrderDialogComponent', () => {
  let component: CancelOrderDialogComponent;
  let fixture: ComponentFixture<CancelOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelOrderDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

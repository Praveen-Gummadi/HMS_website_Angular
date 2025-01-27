import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-cancel-order-dialog',
  standalone: true,
  imports: [SharedModule, MatDialogModule],
  templateUrl: './cancel-order-dialog.component.html',
  styleUrl: './cancel-order-dialog.component.scss'
})
export class CancelOrderDialogComponent {
  cancelForm: FormGroup;
  showPopup = false;

  constructor(
    public dialogRef: MatDialogRef<CancelOrderDialogComponent>,
    private fb: FormBuilder
  ) {
    this.cancelForm = this.fb.group({
      reason: ['', Validators.required],
      otherReason: [''],
      refundMethod: ['', Validators.required],
    });
  }

  showpopup() {
    if (this.cancelForm.valid) {
      // this.dialogRef.close(this.cancelForm.value); // Pass form data back
      this.showPopup = true;
    }
  }

  submit() {
    if (this.cancelForm.valid) {
      this.dialogRef.close(this.cancelForm.value);
    }
  }
}


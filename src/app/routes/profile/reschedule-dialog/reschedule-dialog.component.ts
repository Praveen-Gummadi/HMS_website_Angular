import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reschedule-dialog',
  standalone: true,
  imports: [SharedModule, MatDialogModule],
  templateUrl: './reschedule-dialog.component.html',
  styleUrl: './reschedule-dialog.component.scss'
})
export class RescheduleDialogComponent {
  rescheduleForm: FormGroup;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<RescheduleDialogComponent>,
    private fb: FormBuilder
  ) {
    this.rescheduleForm = this.fb.group({
      reason: ['', Validators.required],
      otherReason: ['']
    });
  }

  submit() {
    if (this.rescheduleForm.valid) {
      this.dialogRef.close(this.rescheduleForm.value);
      this.router.navigate(['/cart'], { queryParams: { step: 2 } });
    }
  }
}

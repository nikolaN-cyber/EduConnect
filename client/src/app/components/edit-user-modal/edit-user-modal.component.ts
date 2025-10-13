import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { User } from '../../models/user';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [SHARED_IMPORTS, MatDialogModule, MatFormFieldModule, MatInputModule],
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
    this.form = this.fb.group({
      username: [data.user.username, Validators.required],
      email: [data.user.email, [Validators.required, Validators.email]],
      firstName: [data.user.firstName, Validators.required],
      lastName: [data.user.lastName, Validators.required],
      country: [data.user.country],
      city: [data.user.city],
      address: [data.user.address],
      phoneNumber: [data.user.phoneNumber],
    });
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    this.dialogRef.close(formValue);
  }
}

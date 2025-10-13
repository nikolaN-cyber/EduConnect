import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserState } from '../../store/user/user.reducer';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { selectAuthLoading, selectAuthError } from '../../store/user/user.selectors';
import { CreateUserDTO } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: CreateUserDTO & { repeatPassword: string } = {
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: '',
    city: '',
    address: '',
    phoneNumber: ''
  };

  loading = false;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  async onSubmit() {
    if (this.form.password !== this.form.repeatPassword) {
      this.snackBar.open('Passwords do not match', 'Close', { duration: 3000 });
      return;
    }

    this.loading = true;

    try {
      const userToSend = { ...this.form };
      await this.userService.register(userToSend);
      this.snackBar.open('Registration successful! Please login', 'Close', { duration: 3000 });
      this.router.navigate(['/']);
    } catch (error: any) {
      const message = error?.message || 'Registration failed. Try again.';
      this.snackBar.open(message, 'Close', { duration: 3000 });
    } finally {
      this.loading = false;
    }
  }
}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthError, selectAuthLoading, selectUser } from '../../store/user/user.selectors';
import { UserState } from '../../store/user/user.reducer';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loginUser } from '../../store/user/user.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  loading$;
  error$;
  user$;

  constructor(private store: Store<UserState>, private snackBar: MatSnackBar) {
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
    this.user$ = this.store.select(selectUser);
  }

  onSubmit() {
    if (this.email && this.password) {
      this.store.dispatch(loginUser({ email: this.email, password: this.password }));
    } else {
      this.snackBar.open('Please enter email and password', 'Close', { duration: 3000 });
    }
  }
}

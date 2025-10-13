import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logoutUser } from '../../store/user/user.actions';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { UserState } from '../../store/user/user.reducer';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private store: Store<UserState>) {
  }

  logout() {
    this.store.dispatch(logoutUser());
  }
}

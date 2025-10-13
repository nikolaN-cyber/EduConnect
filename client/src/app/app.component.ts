import { Component } from '@angular/core';
import { SHARED_IMPORTS } from './shared/shared-imports';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsLoggedIn } from './store/user/user.selectors';
import { UserState } from './store/user/user.reducer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SHARED_IMPORTS, NavbarComponent],
  templateUrl: `./app.component.html`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<UserState>) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
  }
}

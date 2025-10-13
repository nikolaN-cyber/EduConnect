import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../../store/user/user.reducer';
import { selectUser } from '../../store/user/user.selectors';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { MatDialog } from '@angular/material/dialog';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { editUser } from '../../store/user/user.actions';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
  user$: Observable<User | null>;

  constructor(private store: Store<UserState>, private dialog: MatDialog) {
    this.user$ = this.store.select(selectUser);
  }

  openEditModal(user: User) {
    const dialogRef = this.dialog.open(EditUserModalComponent, {
      width: '500px',
      data: { user },
    });
    dialogRef.afterClosed().subscribe((updatedData) => {
      if (updatedData) {

        const userId = user.id;

        this.store.dispatch(editUser({ userId, editUser: updatedData }));
      }
    });
  }
}

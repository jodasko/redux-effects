import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/store/app.reducers';

import { getUsers } from 'src/app/store/actions';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: any;

  constructor(
    private userService: UserService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // this.userService.getUsers().subscribe((users) => {
    //   this.users = users;
    // });

    /**
     * Implementinf NgRx Effects
     */
    this.store.select('users').subscribe((storedUsers) => {
      this.users = storedUsers.users;
      this.loading = storedUsers.loading;
      this.error = storedUsers.error;
    });
    this.store.dispatch(getUsers());
  }
}

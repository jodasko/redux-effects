import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { getUser } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user?: User;
  loading = false;
  error: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('user').subscribe(({ id, user, loading, error }) => {
      if (user) {
        this.user = user;
        this.loading = loading;
        this.error = error;
      }
    });

    this.activatedRoute.params.subscribe((currentRoute: any) => {
      this.store.dispatch(getUser({ id: currentRoute.id }));
    });
  }
}

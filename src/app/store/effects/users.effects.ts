import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { getUsers, getUsersError, getUsersSuccess } from '../actions';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      // tap((data) => console.log('effect tap :', data)),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          // tap((data) => console.log('GetUsers Effect Data : ', data)),
          map((usersList) => getUsersSuccess({ users: usersList })),
          catchError((err) => of(getUsersError({ payload: err })))
          // tap((resp) => console.log('erro => ', resp))
        )
      )
    )
  );
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { getUser, getUserError, getUserSuccess } from '../actions';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUser),
      // tap((data) => console.log('effect tap :', data)),
      mergeMap((action) =>
        this.userService.getUserById(action.id).pipe(
          // tap((data) => console.log('GetUsers Effect Data : ', data)),
          map((user) => getUserSuccess({ user: user })),
          catchError((err) => of(getUserError({ payload: err })))
          // tap((resp) => console.log('erro => ', resp))
        )
      )
    )
  );
}

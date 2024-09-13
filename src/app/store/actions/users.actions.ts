import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const getUsers = createAction('[USERS] GetUsers');

export const getUsersSuccess = createAction(
  '[USERS] GetUsers Success',
  props<{ users: User[] }>()
);

export const getUsersError = createAction(
  '[USERS] GetUsers Error',
  props<{ payload: any }>()
);

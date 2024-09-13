import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const getUser = createAction('[USER] GetUser', props<{ id: string }>());

export const getUserSuccess = createAction(
  '[USER] GetUser Success',
  props<{ user: User }>()
);

export const getUserError = createAction(
  '[USER] GetUser Error',
  props<{ payload: any }>()
);

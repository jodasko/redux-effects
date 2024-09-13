import { User } from 'src/app/models/user.model';
import { createReducer, on } from '@ngrx/store';
import { getUsers, getUsersSuccess, getUsersError } from '../actions';

export interface UsersState {
  users: User[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

const usersInitialState: UsersState = {
  users: [],
  loaded: false,
  loading: false,
  error: null,
};

export const usersReducer = createReducer(
  usersInitialState,
  on(getUsers, (state) => ({ ...state, loading: true })),

  on(getUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    loaded: true,
    users: [...users],
  })),

  on(getUsersError, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  }))
);

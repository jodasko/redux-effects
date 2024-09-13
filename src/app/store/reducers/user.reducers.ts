import { User } from 'src/app/models/user.model';
import { createReducer, on } from '@ngrx/store';
import { getUser, getUserSuccess, getUserError } from '../actions';

export interface UserState {
  id: string | null;
  user: User | null;
  loaded: boolean;
  loading: boolean;
  error: any;
}

const userInitialState: UserState = {
  id: null,
  user: null,
  loaded: false,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  userInitialState,
  on(getUser, (state, { id }) => ({ ...state, loading: true, id: id })),

  on(getUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: { ...user },
  })),

  on(getUserError, (state, { payload }) => ({
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

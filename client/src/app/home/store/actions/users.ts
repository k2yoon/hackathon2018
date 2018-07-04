import { Action } from '@ngrx/store';
import { User } from '../../../shared/services';


export enum UsersActionTypes {
  Load = '[Users] Load All',
  Search = '[Users] Search',
  LoadFailure = '[Users] Load All Failure',
  LoadSuccess = '[Users] Load All Success',
  LoadUsersByCategory = '[Users] Load Users By Category',
}

export class LoadUsers implements Action {
  readonly type = UsersActionTypes.Load;
}

export class LoadUsersByCategory implements Action {
  readonly type = UsersActionTypes.LoadUsersByCategory;
  constructor(public readonly payload: { category: string }) {}
}

export class LoadUsersFailure implements Action {
  readonly type = UsersActionTypes.LoadFailure;
  constructor(public readonly payload: { error: string }) {}
}

export class LoadUsersSuccess implements Action {
  readonly type = UsersActionTypes.LoadSuccess;
  constructor(public readonly payload: { users: User[] }) {}
}

export class SearchUsers implements Action {
  readonly type = UsersActionTypes.Search;
  constructor(public readonly payload: { params: { [key: string]: any } }) {}
}

export type UsersActions
  = LoadUsers
  | LoadUsersByCategory
  | LoadUsersFailure
  | LoadUsersSuccess
  | SearchUsers;

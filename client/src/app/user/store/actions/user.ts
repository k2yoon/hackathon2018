import { Action } from '@ngrx/store';
import { User } from '../../../shared/services';

export enum UserActionTypes {
  LoadById = '[User] Load By ID',
  LoadByIdSuccess = '[User] Load By ID Success',
  LoadByIdFailure = '[User] Load By ID Failure',
  LoadSuggested = '[User] Load Suggested',
  LoadSuggestedSuccess = '[User] Load Suggested Success'
}

export class LoadById implements Action {
  readonly type = UserActionTypes.LoadById;
  constructor(public readonly payload: { userId: number }) {}
}

export class LoadByIdSuccess implements Action {
  readonly type = UserActionTypes.LoadByIdSuccess;
  constructor(public readonly payload: { user: User }) {}
}

export class LoadByIdFailure implements Action {
  readonly type = UserActionTypes.LoadByIdFailure;
  constructor(public readonly payload: { error: string}) {}
}

export class LoadSuggested implements Action {
  readonly type = UserActionTypes.LoadSuggested;
  constructor(public readonly payload: { userId: number }) {}
}

export class LoadSuggestedSuccess implements Action {
  readonly type = UserActionTypes.LoadSuggestedSuccess;
  constructor(public readonly payload: { users: User[] }) {}
}

export type UserActions
  = LoadById
  | LoadByIdSuccess
  | LoadByIdFailure
  | LoadSuggested
  | LoadSuggestedSuccess;

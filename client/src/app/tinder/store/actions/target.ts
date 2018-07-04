import { Action } from '@ngrx/store';
import { Target } from '../../../shared/services';

export enum TargetActionTypes {
  LoadById = '[Target] Load By ID', // userId, projectId, skillId
  LoadByIdSuccess = '[Target] Load By ID Success',
  LoadByIdFailure = '[Target] Load By ID Failure',
  LoadSuggested = '[Target] Load Suggested',
  LoadSuggestedSuccess = '[Target] Load Suggested Success'
}

export class LoadById implements Action {
  readonly type = TargetActionTypes.LoadById;
  constructor(public readonly payload: { targetId: number }) {}
}

export class LoadByIdSuccess implements Action {
  readonly type = TargetActionTypes.LoadByIdSuccess;
  constructor(public readonly payload: { target: Target }) {}
}

export class LoadByIdFailure implements Action {
  readonly type = TargetActionTypes.LoadByIdFailure;
  constructor(public readonly payload: { error: string}) {}
}

export class LoadSuggested implements Action {
  readonly type = TargetActionTypes.LoadSuggested;
  constructor(public readonly payload: { targetId: number }) {}
}

export class LoadSuggestedSuccess implements Action {
  readonly type = TargetActionTypes.LoadSuggestedSuccess;
  constructor(public readonly payload: { targets: Target[] }) {}
}

export type TargetActions
  = LoadById
  | LoadByIdSuccess
  | LoadByIdFailure
  | LoadSuggested
  | LoadSuggestedSuccess;

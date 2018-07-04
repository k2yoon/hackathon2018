import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { UserService } from '../../../shared/services';
import {
  LoadById,
  LoadByIdFailure,
  LoadByIdSuccess,
  LoadSuggestedSuccess,
  UserActionTypes
} from '../actions';


@Injectable()
export class UserEffects {
  @Effect()
  loadUserById$: Observable<Action> = this.actions$
    .pipe(
      ofType<LoadById>(UserActionTypes.LoadById),
      map(action => action.payload.userId),
      switchMap(userId => this.userService.getById(userId)),
      map(user => new LoadByIdSuccess({ user })),
      catchError(error => of(new LoadByIdFailure({ error })))
    );

  @Effect()
  loadSuggested$: Observable<Action> = this.actions$
    .pipe(
      ofType(UserActionTypes.LoadSuggested),
      switchMap(() => this.userService.getAll()),
      map(users => new LoadSuggestedSuccess({ users })),
      catchError(error => {
        // Error with loading suggested users doesn't break user's workflow,
        // so we basically ignore it and return an empty array.
        console.error(`Error while suggested users: ${error}`);
        return of(new LoadSuggestedSuccess({ users: [] }));
      })
    );

  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService
  ) {
  }
}

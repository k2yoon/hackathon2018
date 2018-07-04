import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { TargetService } from '../../../shared/services';
import {
  LoadById,
  LoadByIdFailure,
  LoadByIdSuccess,
  LoadSuggestedSuccess,
  TargetActionTypes
} from '../actions';


@Injectable()
export class TargetEffects {
  @Effect()
  loadTargetById$: Observable<Action> = this.actions$
    .pipe(
      ofType<LoadById>(TargetActionTypes.LoadById),
      map(action => action.payload.targetId),
      switchMap(targetId => this.targetService.getById(targetId)),
      map(target => new LoadByIdSuccess({ target })),
      catchError(error => of(new LoadByIdFailure({ error })))
    );

  @Effect()
  loadSuggested$: Observable<Action> = this.actions$
    .pipe(
      ofType(TargetActionTypes.LoadSuggested),
      switchMap(() => this.targetService.getAll()),
      map(targets => new LoadSuggestedSuccess({ targets })),
      catchError(error => {
        // Error with loading suggested users doesn't break user's workflow,
        // so we basically ignore it and return an empty array.
        console.error(`Error while suggested users: ${error}`);
        return of(new LoadSuggestedSuccess({ targets: [] }));
      })
    );

  constructor(
    private readonly actions$: Actions,
    private readonly targetService: TargetService
  ) {
  }
}

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { MatchService } from '../../../shared/services';
import { MatchActionTypes, UpdateMatch, ReuqestMatch } from '../actions';


@Injectable()
export class MatchEffects {
  @Effect()
  matchUpdates$: Observable<Action> = this.matchService.matchUpdates
    .pipe(
      map(matchRes => new UpdateMatch(matchRes))
    );

  @Effect({ dispatch: false })
  matchRequet$ = this.actions$
    .pipe(
      ofType<ReuqestMatch>(MatchActionTypes.RequestMatch),
      map(action => action.payload),
      tap(({ userId, targetId}) => this.matchService.requestMatch(userId, targetId))
    );

  constructor(
    private readonly actions$: Actions,
    private readonly matchService: MatchService
  ) {
  }
}

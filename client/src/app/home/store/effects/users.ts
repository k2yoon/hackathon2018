import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { User, UserService } from '../../../shared/services';
import {
  LoadUsersByCategory,
  LoadUsersFailure,
  LoadUsersSuccess,
  UsersActionTypes,
  SearchUsers
} from '../actions';


@Injectable()
export class UsersEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService) {}

  @Effect()
  loadUsers$: Observable<Action> = this.actions$
    .pipe(
      ofType(UsersActionTypes.Load),
      switchMap(() => this.userService.getAll()),
      handleLoadedUsers()
    );

  @Effect()
  loadUsers1$: Observable<Action> = this.actions$
    .pipe(
      ofType(UsersActionTypes.Load),
      switchMap(() => this.userService.getAll()),
      handleLoadedUsers()
    );

  @Effect()
  loadByCategory$: Observable<Action> = this.actions$
    .pipe(
      ofType<LoadUsersByCategory>(UsersActionTypes.LoadUsersByCategory),
      map(action => action.payload.category),
      switchMap(category => this.userService.getByCategory(category)),
      handleLoadedUsers()
    );

  @Effect()
  searchUsers$: Observable<Action> = this.actions$
    .pipe(
      ofType(UsersActionTypes.Search),
      map((action: SearchUsers) => action.payload.params),
      switchMap(params => this.userService.search(params)),
      handleLoadedUsers()
    );
}

const handleLoadedUsers = () =>
  (source: Observable<User[]>) => source.pipe(
    map(users => new LoadUsersSuccess({ users })),
    catchError(error => of(new LoadUsersFailure({ error })))
  );

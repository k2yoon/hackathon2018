import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { User } from '../shared/services';
import { getSelectedUser, getSuggestedUsers, LoadById, LoadSuggested } from './store';


@Component({
  selector: 'nga-user',
  styleUrls: [ './user.component.scss' ],
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnDestroy {
  readonly user$: Observable<User>;
  readonly suggestedUsers$: Observable<User[]>;
  private readonly routeParamsSubscription: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<any>
  ) {
    this.user$ = this.store.pipe(select(getSelectedUser));
    this.suggestedUsers$ = this.store.pipe(select(getSuggestedUsers));
    this.routeParamsSubscription = this.route.paramMap
      .pipe(
        map(params => parseInt(params.get('userId') || '', 10)),
        filter(userId => !!userId)
      )
      .subscribe(userId => {
        this.store.dispatch(new LoadById({ userId }));
        this.store.dispatch(new LoadSuggested({ userId }));
      });
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }
}

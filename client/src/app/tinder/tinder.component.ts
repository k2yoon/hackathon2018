import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Target } from '../shared/services';
import { getSelectedTarget, getSuggestedTargets, LoadById, LoadSuggested } from './store';


@Component({
  selector: 'nga-tinder',
  templateUrl: './tinder.component.html',
  styleUrls: ['./tinder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TinderComponent implements OnDestroy {
  readonly userId: number = 123;
  readonly target$: Observable<Target>;
  readonly suggestedTargets$: Observable<Target[]>;
  private readonly routeParamsSubscription: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<any>
  ) {
    this.target$ = this.store.pipe(select(getSelectedTarget));
    this.suggestedTargets$ = this.store.pipe(select(getSuggestedTargets));
    this.routeParamsSubscription = this.route.paramMap
      .pipe(
        map(params => parseInt(params.get('targetId') || '1', 10)),
        filter(targetId => !!targetId)
      )
      .subscribe(targetId => {
        this.store.dispatch(new LoadById({ targetId }));
        this.store.dispatch(new LoadSuggested({ targetId }));
      });
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }
}

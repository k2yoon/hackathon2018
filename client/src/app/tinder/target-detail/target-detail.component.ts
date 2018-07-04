import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChange
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens';

import { Target } from '../../shared/services';
import { getMatches, ReuqestMatch } from '../store';


@Component({
  selector: 'nga-target-detail',
  styleUrls: [ './target-detail.component.scss' ],
  templateUrl: './target-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetDetailComponent implements OnChanges, OnInit {
  matches$: Observable<number>;
  @Input() target: Target = <Target>{};
  @Input() userId: number;
  private readonly targetChange$ = new Subject<Target>();

  constructor(
    @Inject(API_BASE_URL) private readonly baseUrl: string,
    private readonly store: Store<any>
  ) {
  }

  ngOnInit() {
    this.matches$ = combineLatest(
      this.targetChange$.pipe(startWith(this.target)),
      this.store.pipe(
        select(getMatches),
        startWith<{} | null>(new Map())
      ),
      (target, matches) => {
        const matchNum = matches[target.id];
        return matchNum ? matchNum : matches;
      }
    );
  }

  ngOnChanges({ target }: { target: SimpleChange }) {
    this.targetChange$.next(target.currentValue);
  }

  matchRequest() { // price: number) {
    alert('Match Request Submitted');
    this.store.dispatch(new ReuqestMatch({
      userId: this.userId,
      targetId: this.target.id,
      matchReq: true
      // amount: price
    }));
  }

  pass() {
  }

  urlFor(target: Target): string {
    return `${this.baseUrl}/${target.imageUrl}`;
  }
}

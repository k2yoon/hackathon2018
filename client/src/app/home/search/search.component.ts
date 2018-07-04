import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../shared/services';
import { State } from '../store';
import { SearchUsers } from '../store/actions';
import { getUsersData } from '../store/reducers';


@Component({
  selector: 'nga-search',
  styleUrls: [ './search.component.scss' ],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnDestroy {
  readonly users$: Observable<User[]>;
  private readonly paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>
  ) {
    this.users$ = this.store.pipe(select(getUsersData));
    this.paramsSubscription = this.route.queryParams.subscribe(
      params => this.store.dispatch(new SearchUsers({ params }))
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}

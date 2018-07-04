import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../shared/services';
import {
  getCategoriesData,
  getUsersData,
  LoadCategories,
  LoadUsers,
  LoadUsersByCategory,
  State
} from '../store';

@Component({
  selector: 'nga-categories',
  styleUrls: [ './categories.component.scss' ],
  templateUrl: './categories.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnDestroy {
  readonly categories$: Observable<string[]>;
  readonly users$: Observable<User[]>;
  private readonly usersSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>
  ) {
    this.users$ = this.store.pipe(select(getUsersData));
    this.categories$ = this.store.pipe(
      select(getCategoriesData),
      map(categories => [ 'all', ...categories ])
    );

    this.usersSubscription = this.route.params.subscribe(
      ({ category }) => this.getCategory(category)
    );

    this.store.dispatch(new LoadCategories());
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }

  private getCategory(category: string): void {
    return category.toLowerCase() === 'all'
      ? this.store.dispatch(new LoadUsers())
      : this.store.dispatch(new LoadUsersByCategory({ category: category.toLowerCase() }));
  }
}

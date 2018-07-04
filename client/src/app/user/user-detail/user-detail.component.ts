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
import { User } from '../../shared/services';
import { getBids, PlaceBid } from '../store';


@Component({
  selector: 'nga-user-detail',
  styleUrls: [ './user-detail.component.scss' ],
  templateUrl: './user-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnChanges, OnInit {
  price$: Observable<number>;
  @Input() user: User = <User>{};
  private readonly userChange$ = new Subject<User>();

  constructor(
    @Inject(API_BASE_URL) private readonly baseUrl: string,
    private readonly store: Store<any>
  ) {
  }

  ngOnInit() {
    this.price$ = combineLatest(
      this.userChange$.pipe(startWith(this.user)),
      this.store.pipe(
        select(getBids),
        startWith<{} | null>(new Map())
      ),
      (user, bids) => {
        const amount = bids[user.id];
        return amount ? amount : user.price;
      }
    );
  }

  ngOnChanges({ user }: { user: SimpleChange }) {
    this.userChange$.next(user.currentValue);
  }

  placeBid(price: number) {
    this.store.dispatch(new PlaceBid({
      userId: this.user.id,
      amount: price
    }));
  }

  urlFor(user: User): string {
    return `${this.baseUrl}/${user.imageUrl}`;
  }
}

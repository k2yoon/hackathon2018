import { Component, Inject, Input } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens';
import { User } from '../../shared/services';

@Component({
  selector: 'nga-user-suggestion',
  styleUrls: [ './user-suggestion.component.scss' ],
  templateUrl: './user-suggestion.component.html'
})
export class UserSuggestionComponent {
  @Input() users: User[];
  readonly columns$: Observable<number>;
  readonly breakpointsToColumnsNumber = new Map([
    [ 'xs', 2 ],
    [ 'sm', 3 ],
    [ 'md', 5 ],
    [ 'lg', 2 ],
    [ 'xl', 3 ],
  ]);

  constructor(
    @Inject(API_BASE_URL) private readonly baseUrl: string,
    private readonly media: ObservableMedia
  ) {
    // If the initial screen size is xs ObservableMedia doesn't emit an event
    // and grid-list rendering fails. Once the following issue is closed, this
    // comment can be removed: https://github.com/angular/flex-layout/issues/388
    this.columns$ = this.media.asObservable()
      .pipe(
        map(mc => <number>this.breakpointsToColumnsNumber.get(mc.mqAlias)),
        startWith(3)
      );
  }

  urlFor(user: User): string {
    return `${this.baseUrl}/${user.imageUrl}`;
  }
}

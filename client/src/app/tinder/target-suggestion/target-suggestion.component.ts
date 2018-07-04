import { Component, Inject, Input } from '@angular/core';
// ViewChild, ElementRef, ContentChildren, QueryList,
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
// import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';
// import { CarouselItemDirective } from '../carousel.directive';

import { API_BASE_URL } from '../../app.tokens';
import { Target } from '../../shared/services';
import { Store } from '@ngrx/store';
// import { Observable, Subject, combineLatest } from 'rxjs';
// import { startWith } from 'rxjs/operators';
import { ReuqestMatch } from '../store';



@Component({
  selector: 'nga-target-suggestion',
  styleUrls: [ './target-suggestion.component.scss' ],
  templateUrl: './target-suggestion.component.html'
})
export class TargetSuggestionComponent {
  @Input() targets: Target[];
  @Input() userId: number;
  // @ContentChildren(CarouselItemDirective) items: QueryList<CarouselItemDirective>;
  // @ViewChild('carousel2') private carousel: ElementRef;
  // @ViewChildren(CarouselItemElement, { read: ElementRef }) private itemsElements: QueryList<ElementRef>;
  // private player: AnimationPlayer;
  // private itemWidth: number;
  // private currentSlide = 0;
  // private timing = '250ms ease-in';

  // carouselWrapperStyle = {};
  readonly columns$: Observable<number>;
  readonly columns: number = 5;
  readonly breakpointsToColumnsNumber = new Map([
    [ 'xs', 2 ],
    [ 'sm', 3 ],
    [ 'md', 5 ],
    [ 'lg', 2 ],
    [ 'xl', 3 ],
  ]);

  constructor(
    @Inject(API_BASE_URL) private readonly baseUrl: string,
    private readonly store: Store<any>,
    // private builder: AnimationBuilder
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
    // this.columns = 2;
  }

  urlFor(target: Target): string {
    return `${this.baseUrl}/${target.imageUrl}`;
  }

  // next() {
  //   if ( this.currentSlide + 1 === this.items.length ) { return; }
  //   this.currentSlide = (this.currentSlide + 1) % this.items.length;
  //   const offset = this.currentSlide * this.itemWidth;
  //   const myAnimation: AnimationFactory = this.buildAnimation(offset);
  //   this.player = myAnimation.create(this.carousel.nativeElement);
  //   this.player.play();
  // }

  // private buildAnimation( offset ) {
  //   return this.builder.build([
  //     animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
  //   ]);
  // }

  // prev() {
  //   if ( this.currentSlide === 0 ) { return; }

  //   this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
  //   const offset = this.currentSlide * this.itemWidth;

  //   const myAnimation: AnimationFactory = this.buildAnimation(offset);
  //   this.player = myAnimation.create(this.carousel.nativeElement);
  //   this.player.play();
  // }

  // // tslint:disable-next-line:use-life-cycle-interface
  // ngAfterViewInit() {
  //   // For some reason only here I need to add setTimeout, in my local env it's working without this.
  //   setTimeout(() => {
  //     // this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
  //     // this.carouselWrapperStyle = {
  //     //   width: `${this.itemWidth}px`
  //     // };
  //   });
  // }

  matchRequest(target: Target) { // price: number) {
    console.log('match request activated');
    this.store.dispatch(new ReuqestMatch({
      userId: this.userId,
      targetId: target.id,
      matchReq: true
      // amount: price
    }));
  }

  pass() {
    console.log('pass to next');
  }
}

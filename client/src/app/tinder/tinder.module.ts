import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
// import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TinderComponent } from './tinder.component';
import { MatchEffects, TargetEffects, reducers } from './store';
import { TargetDetailComponent } from './target-detail';
import { TargetSuggestionComponent } from './target-suggestion';

// import { CarouselComponent, CarouselItemElement } from './carousel.component';
import { CarouselItemDirective } from './carousel.directive';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild([
      { path: '', component: TinderComponent }
    ]),

    StoreModule.forFeature('targetPage', reducers),
    EffectsModule.forFeature([ MatchEffects, TargetEffects ]),

    MatButtonModule,
    MatGridListModule,
    MatIconModule
  ],
  declarations: [
    TinderComponent,
    TargetDetailComponent,
    TargetSuggestionComponent,
    // CarouselComponent,
    // CarouselItemElement,
    CarouselItemDirective
  ]
})
export class TinderModule {
}

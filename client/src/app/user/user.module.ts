import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserDetailComponent } from './user-detail';
import { UserSuggestionComponent } from './user-suggestion';

import { UserComponent } from './user.component';
import { BidEffects, UserEffects, reducers } from './store';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild([
      { path: '', component: UserComponent }
    ]),

    StoreModule.forFeature('userPage', reducers),
    EffectsModule.forFeature([ BidEffects, UserEffects ]),

    MatButtonModule,
    MatGridListModule
  ],
  declarations: [
    UserComponent,
    UserDetailComponent,
    UserSuggestionComponent
  ]
})
export class UserModule {
}

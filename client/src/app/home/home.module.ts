import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { Route, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CategoriesComponent } from './categories/categories.component';
import { UserGridComponent } from './user-grid/user-grid.component';
import { SearchComponent } from './search/search.component';
import { CategoriesEffects, UsersEffects, reducers } from './store';


const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'categories' },
  { path: 'search', component: SearchComponent },
  {
    path: 'categories',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'all' },
      { path: ':category', component: CategoriesComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatGridListModule,
    MatTabsModule,

    StoreModule.forFeature('homePage', reducers),
    EffectsModule.forFeature([ CategoriesEffects, UsersEffects ])
  ],
  declarations: [
    CategoriesComponent,
    UserGridComponent,
    SearchComponent
  ]
})
export class HomeModule {
}

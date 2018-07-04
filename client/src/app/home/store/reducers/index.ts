import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../store';
import * as fromCategories from './categories';
import * as fromUsers from './users';

export interface HomeState {
  categories: fromCategories.State;
  users: fromUsers.State;
}

export interface State extends fromRoot.State {
  homePage: HomeState;
}

export const reducers = {
  categories: fromCategories.reducer,
  users: fromUsers.reducer
};

/**
 * Selectors
 */

export const getHomeState = createFeatureSelector<HomeState>('homePage');

export const getUsersState = createSelector(getHomeState, state => state.users);
export const getUsersData = createSelector(getUsersState, fromUsers.getData);
export const getUsersDataLoading = createSelector(getUsersState, fromUsers.getDataLoading);
export const getUsersDataLoadingError = createSelector(getUsersState, fromUsers.getDataLoadingError);

export const getCategoriesState = createSelector(getHomeState, state => state.categories);
export const getCategoriesData = createSelector(getCategoriesState, fromCategories.getData);

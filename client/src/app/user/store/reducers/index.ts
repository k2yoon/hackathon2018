import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../store';
import * as fromBid from './bid';
import * as fromUser from './user';


export interface UserState {
  user: fromUser.State;
  bid: fromBid.State;
}

export interface State extends fromRoot.State {
  userPage: UserState;
}

export const reducers = {
  user: fromUser.reducer,
  bid: fromBid.reducer
};

/**
 * Selectors
 */

export const getUserPageState = createFeatureSelector<UserState>('userPage');
export const getUserState = createSelector(getUserPageState, state => state.user);
export const getSelectedUser = createSelector(getUserState, fromUser.getSelected);
export const getSuggestedUsers = createSelector(getUserState, fromUser.getSuggested);

export const getBidState = createSelector(getUserPageState, state => state.bid);
export const getBids = createSelector(getBidState, fromBid.getBids);

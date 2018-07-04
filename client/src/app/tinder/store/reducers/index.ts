import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../store';
import * as fromMatch from './match';
import * as fromTarget from './target';


export interface TargetState {
  target: fromTarget.State;
  match: fromMatch.State;
}

export interface State extends fromRoot.State {
  targetPage: TargetState;
}

export const reducers = {
  target: fromTarget.reducer,
  match: fromMatch.reducer
};

/**
 * Selectors
 */

export const getTargetPageState = createFeatureSelector<TargetState>('targetPage');
export const getTargetState = createSelector(getTargetPageState, state => state.target);
export const getSelectedTarget = createSelector(getTargetState, fromTarget.getSelected);
export const getSuggestedTargets = createSelector(getTargetState, fromTarget.getSuggested);

export const getMatchState = createSelector(getTargetPageState, state => state.match);
export const getMatches = createSelector(getMatchState, fromMatch.getMatches);

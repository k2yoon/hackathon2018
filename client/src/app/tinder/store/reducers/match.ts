import { MatchActions, MatchActionTypes } from '../actions';


export interface State {
  matches: { [targetId: number]: boolean };
}

const initialState: State = {
  matches: {}
};

export function reducer(state = initialState, action: MatchActions): State {
  switch (action.type) {
    case MatchActionTypes.UpdateMatch: {
      const { targetId, matchRes } = action.payload;
      return {
        ...state,
        matches: { ...state.matches, [ targetId ]: matchRes }
      };
    }

    default: {
      return state;
    }
  }
}

export const getMatches = (state: State) => state.matches;

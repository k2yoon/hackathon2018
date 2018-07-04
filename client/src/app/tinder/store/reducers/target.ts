import { Target } from '../../../shared/services';
import { TargetActions, TargetActionTypes } from '../actions';


export interface State {
  selected?: Target;
  suggested: Target[];
}

const initialState: State = {
  suggested: []
};

export function reducer(state = initialState, action: TargetActions): State {
  switch (action.type) {
    case TargetActionTypes.LoadByIdSuccess: {
      return {
        ...state,
        selected: action.payload.target
      };
    }

    case TargetActionTypes.LoadSuggestedSuccess: {
      return {
        ...state,
        suggested: action.payload.targets
      };
    }

    default: {
      return state;
    }
  }
}

export const getSelected = (state: State) => state.selected;
export const getSuggested = (state: State) => state.suggested;

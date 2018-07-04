import { User } from '../../../shared/services';
import { UserActions, UserActionTypes } from '../actions';


export interface State {
  selected?: User;
  suggested: User[];
}

const initialState: State = {
  suggested: []
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.LoadByIdSuccess: {
      return {
        ...state,
        selected: action.payload.user
      };
    }

    case UserActionTypes.LoadSuggestedSuccess: {
      return {
        ...state,
        suggested: action.payload.users
      };
    }

    default: {
      return state;
    }
  }
}

export const getSelected = (state: State) => state.selected;
export const getSuggested = (state: State) => state.suggested;

import { User } from '../../../shared/services';
import { UsersActions, UsersActionTypes } from '../actions';

export interface State {
  data: User[];
  loading: boolean;
  loadingError?: string;
}

export const initialState: State = {
  data: [],
  loading: false
};

export function reducer(state = initialState, action: UsersActions): State {
  switch (action.type) {
    case UsersActionTypes.Load: {
      return {
        ...state,
        loading: true,
        loadingError: null
      };
    }

    case UsersActionTypes.LoadSuccess: {
      return {
        ...state,
        data: action.payload.users,
        loading: false,
        loadingError: null
      };
    }

    case UsersActionTypes.LoadFailure: {
      return {
        ...state,
        data: [],
        loading: false,
        loadingError: action.payload.error
      };
    }

    default: {
      return state;
    }
  }
}

/**
Accessors for the data in the users state object
These accessors are used to create selectors defined in index.ts
We're defining these functions here to keep them where the State interface is declared
*/
export const getData = (state: State) => state.data;
export const getDataLoading = (state: State) => state.loading;
export const getDataLoadingError = (state: State) => state.loadingError;

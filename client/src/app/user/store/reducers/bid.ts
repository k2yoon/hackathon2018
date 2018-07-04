import { BidActions, BidActionTypes } from '../actions';


export interface State {
  bids: { [userId: number]: number };
}

const initialState: State = {
  bids: {}
};

export function reducer(state = initialState, action: BidActions): State {
  switch (action.type) {
    case BidActionTypes.BidUpdate: {
      const { userId, amount } = action.payload;
      return {
        ...state,
        bids: { ...state.bids, [ userId ]: amount }
      };
    }

    default: {
      return state;
    }
  }
}

export const getBids = (state: State) => state.bids;

import { Action } from '@ngrx/store';
// import { matchesElement } from '@angular/animations/browser/src/render/shared';


// export enum BidActionTypes {
//   PlaceBid = '[Bid] Place Bid',
//   BidUpdate = '[Bid] Bid Update'
// }

export enum MatchActionTypes {
  RequestMatch = '[Match] Request Match',
  UpdateMatch = '[Match] Update Match'
}

// export interface MatchRequest {
//   userId: number;
//   targetId: number;
//   matchReq: boolean;
// }

export class ReuqestMatch implements Action {
  readonly type = MatchActionTypes.RequestMatch;
  constructor(public readonly payload: { userId: number, targetId: number, matchReq: boolean }) {}
}

// export interface MatchResponse {
//   userId: number;
//   targetId: number;
//   matchRes: boolean;
// }

export class UpdateMatch implements Action {
  readonly type = MatchActionTypes.UpdateMatch;
  constructor(public readonly payload: { userId: number, targetId: number, matchRes: boolean }) {}
}

export type MatchActions
  = ReuqestMatch
  | UpdateMatch;

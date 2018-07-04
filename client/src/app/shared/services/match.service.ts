import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/websocket';
import { WS_URL } from '../../app.tokens';

export interface Match {
  matchId: number;
  userId: number;
  targetId: number;
  matchReq: boolean;
  matchRes: boolean;
}

export interface MatchRequest {
  userId: number;
  targetId: number;
  matchReq: boolean;
}

export interface MatchResponse {
  userId: number;
  targetId: number;
  matchRes: boolean;
}

@Injectable()
export class MatchService {

  private _subject: WebSocketSubject<any>;
  private get subject(): WebSocketSubject<any> {
    const open = this._subject && !this._subject.closed;
    return open ? this._subject
                : this._subject = new WebSocketSubject(this.wsUrl);
  }

  get matchUpdates(): Observable<MatchResponse> {
    return this.subject.asObservable();
  }

  constructor(@Inject(WS_URL) private readonly wsUrl: string) {}

  requestMatch(userId: number, targetId: number, matchReq: boolean = true): void {
    this.subject.next({ userId, targetId, matchReq });
  }

  respondMatch(userId: number, targetId: number, MatchRes: boolean): void {
    this.subject.next({ userId, targetId, MatchRes});
  }
}

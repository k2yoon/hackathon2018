import { Provider } from '@angular/core';
import { RouterStateSerializer } from '@ngrx/router-store';
import { BidService } from './bid.service';
import { MatchService } from './match.service';
import { UserService, HttpUserService } from './user.service';
import { TargetService, HttpTargetService } from './target.service';
import { RouterStateSerializerService } from './router-state-serializer.service';

export { BidMessage, BidService } from './bid.service';
export { User, UserSearchParams, UserService } from './user.service';
export { Match, MatchService } from './match.service';
export { Target, TargetService } from './target.service'; // TargetSearchParams

export { RouterStateSerializerService, RouterStateUrl } from './router-state-serializer.service';

export const SHARED_SERVICES: Provider[] = [
  { provide: BidService, useClass: BidService },
  { provide: MatchService, useClass: MatchService},
  { provide: UserService, useClass: HttpUserService },
  { provide: TargetService, useClass: HttpTargetService },
  { provide: RouterStateSerializer, useClass: RouterStateSerializerService }
];

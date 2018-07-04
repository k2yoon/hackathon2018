import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens';

export interface Target {
  id: number; // userId, skillId, projectId
  name: string; // title
  intro: string;
  imageUrl: string;
  matches: number[]; // price
  knowsWell: string[];
  wantsToLearn: string[];
}

export interface TargetSearchParams {
  [key: string]: any; // To make compatible with HttpParams type.
  title?: string;
  minPrice?: number;
  maxPrice?: number;
}

export abstract class TargetService {
  abstract getAll(): Observable<Target[]>;
  abstract getById(userId: number): Observable<Target>;
  abstract getByCategory(category: string): Observable<Target[]>;
  abstract getAllCategories(): Observable<string[]>;
  abstract search(params: TargetSearchParams): Observable<Target[]>;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class HttpTargetService implements TargetService {

  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {}

  getAll(): Observable<Target[]> {
    return this.http.get<Target[]>(`${this.baseUrl}/api/targets`);
  }

  getById(targetId: number): Observable<Target> {
    return this.http.get<Target>(`${this.baseUrl}/api/targets/${targetId}`);
  }

  updateTarget(targetId: number, $userId: number ): Observable<Number> {
    return this.http.post<Number>(`${this.baseUrl}/api/targets/${targetId}`, $userId, httpOptions );
  }

  getByCategory(category: string): Observable<Target[]> {
    return this.http.get<Target[]>(`${this.baseUrl}/api/targets/categories/${category}`);
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/targets/categories`);
  }

  search(params: TargetSearchParams): Observable<Target[]> {
    return this.http.get<Target[]>(`${this.baseUrl}/api/targets`, { params });
  }
}

@Injectable()
export class StaticTargetService implements TargetService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Target[]> {
    return this.http.get<Target[]>('/data/targets.json');
  }

  getById(targetId: number): Observable<Target> {
    return this.http.get<Target[]>('/data/targets.json').pipe(
      map(targets => <Target>targets.find(p => p.id === targetId)));
  }

  getByCategory(category: string): Observable<Target[]> {
    return this.http.get<Target[]>('/data/targets.json').pipe(
      map(targets => targets.filter(p => p.wantsToLearn.includes(category))));
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<Target[]>('/data/targets.json')
      .pipe(
        map(this.reduceCategories),
        map(categories => Array.from(new Set(categories)))
      );
  }

  search(params: TargetSearchParams): Observable<Target[]> {
    return this.http.get<Target[]>('/data/targets.json').pipe(
      map(targets => this.filterUsers(targets, params))
    );
  }

  private reduceCategories(targets: Target[]): string[] {
    return targets.reduce((all, target) => all.concat(target.wantsToLearn), new Array<string>());
  }

  // search
  private filterUsers(targets: Target[], params: TargetSearchParams): Target[] {
    return targets.filter(p => {
      if (params.title && !p.name.toLowerCase().includes(params.title.toLowerCase())) {
        return false;
      }
      // if (params.minPrice && p.matches < params.minPrice) {
      //   return false;
      // }
      // if (params.maxPrice && p.matches > params.maxPrice) {
      //   return false;
      // }
      return true;
    });
  }
}

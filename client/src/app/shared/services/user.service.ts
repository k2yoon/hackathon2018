import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens';

export interface User {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  categories: string[];
}

export interface UserSearchParams {
  [key: string]: any; // To make compatible with HttpParams type.
  title?: string;
  minPrice?: number;
  maxPrice?: number;
}

export abstract class UserService {
  abstract getAll(): Observable<User[]>;
  abstract getById(userId: number): Observable<User>;
  abstract getByCategory(category: string): Observable<User[]>;
  abstract getAllCategories(): Observable<string[]>;
  abstract search(params: UserSearchParams): Observable<User[]>;
}

@Injectable()
export class HttpUserService implements UserService {
  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/api/users`);
  }

  getById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/users/${userId}`);
  }

  getByCategory(category: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/api/categories/${category}`);
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/categories`);
  }

  search(params: UserSearchParams): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/api/users`, { params });
  }
}

@Injectable()
export class StaticUserService implements UserService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>('/data/users.json');
  }

  getById(userId: number): Observable<User> {
    return this.http.get<User[]>('/data/users.json').pipe(
      map(users => <User>users.find(p => p.id === userId)));
  }

  getByCategory(category: string): Observable<User[]> {
    return this.http.get<User[]>('/data/users.json').pipe(
      map(users => users.filter(p => p.categories.includes(category))));
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<User[]>('/data/users.json')
      .pipe(
        map(this.reduceCategories),
        map(categories => Array.from(new Set(categories)))
      );
  }

  search(params: UserSearchParams): Observable<User[]> {
    return this.http.get<User[]>('/data/users.json').pipe(
      map(users => this.filterUsers(users, params))
    );
  }

  private reduceCategories(users: User[]): string[] {
    return users.reduce((all, user) => all.concat(user.categories), new Array<string>());
  }

  private filterUsers(users: User[], params: UserSearchParams): User[] {
    return users.filter(p => {
      if (params.title && !p.title.toLowerCase().includes(params.title.toLowerCase())) {
        return false;
      }
      if (params.minPrice && p.price < params.minPrice) {
        return false;
      }
      if (params.maxPrice && p.price > params.maxPrice) {
        return false;
      }
      return true;
    });
  }
}

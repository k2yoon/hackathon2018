import * as fs from 'fs';
import * as util from 'util';

type DB = User[];
type DBTarget = Target[];

export interface User {
  id: number;
  title: string;
  description: string;
  categories: string[];
  imageUrl: string;
  price: number;
}

export interface UserSearchParams {
  title?: string;
  minPrice?: string;
  maxPrice?: string;
}

export interface Target {
  id: number;
  name: string;
  description: string;
  categories: string[];
  imageUrl: string;
  matches: number;
}

export interface TargetSearchParams {
  name?: string;
}

const readFile = util.promisify(fs.readFile);
const db$: Promise<DB> = readFile('./data/users.json', 'utf8')
  .then(JSON.parse, console.error);

// target db begin
const dbTarget$: Promise<DBTarget> = readFile('./data/targets.json', 'utf8')
  .then(JSON.parse, console.error);

export async function getTargets(params: TargetSearchParams = {}): Promise<Target[]> {
  return filterTargets(await dbTarget$, params);
}

export async function getTargetById(targetId: number): Promise<any> {
  return (await dbTarget$).find(p => p.id === targetId);
}

export async function updateTargetMatches(targetId: number, matches: number): Promise<any> {
  const targets = await dbTarget$;
  const target = targets.find(p => p.id === targetId);
  if (target) {
    target.matches = matches;
  }
}

function filterTargets(targets: Target[], params: TargetSearchParams): Target[] {
  return targets.filter(p => {
    if (params.name && !p.name.toLowerCase().includes(params.name.toLowerCase())) {
      return false;
    }
    return true;
  });
}
// target db end
export async function getAllCategories(): Promise<string[]> {
  const allCategories = (await db$)
    .map(p => p.categories)
    .reduce((all, current) => all.concat(current), []);

  return [...new Set(allCategories)];
}

export async function getUsers(params: UserSearchParams = {}): Promise<User[]> {
  return filterUsers(await db$, params);
}

export async function getUserById(userId: number): Promise<any> {
   return (await db$).find(p => p.id === userId);
}

export async function getUsersByCategory(category: string): Promise<any[]> {
  return (await db$).filter(p => p.categories.includes(category));
}

export async function updateUserBidPrice(userId: number, price: number): Promise<any> {
  const users = await db$;
  const user = users.find(p => p.id === userId);
  if (user) {
    user.price = price;
  }
}

function filterUsers(users: User[], params: UserSearchParams): User[] {
  return users.filter(p => {
    if (params.title && !p.title.toLowerCase().includes(params.title.toLowerCase())) {
      return false;
    }
    if (params.minPrice && p.price < parseInt(params.minPrice)) {
      return false;
    }
    if (params.maxPrice && p.price > parseInt(params.maxPrice)) {
      return false;
    }
    return true;
  });
}

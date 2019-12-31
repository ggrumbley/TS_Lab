import { AxiosPromise } from 'axios';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
};

export interface IAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
};

export interface IApi<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
};

export interface IEvents {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
};

export interface ViewModel {
  on(eventName: string, callback: Callback): void;
}


export type Callback = () => void;

export type RegionMap = {
  [key: string]: Element,
}

export type EventMap = {
  [key: string]: () => void,
}

export type RegionsMap = {
  [key: string]: string,
}

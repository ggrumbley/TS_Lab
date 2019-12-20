import axios, { AxiosPromise } from 'axios';
import { UserProps } from '../lib/types';

export class Api<T extends UserProps> {
  constructor(public rootUrl: string) {}

  fetch = (id: number): AxiosPromise => axios.get(`${this.rootUrl}/${id}`);

  save = (data: T): AxiosPromise => {
    const { id } = data;
    return id ? axios.put(`${this.rootUrl}/${id}`, data) : axios.post(this.rootUrl, data);
  }
}

import { AxiosResponse } from 'axios';
import { IAttributes, IEvents, IApi, UserProps } from '../lib/types';

export class Model<T extends UserProps> {
  constructor(
    private attributes: IAttributes<T>,
    private events: IEvents,
    private api: IApi<T>,
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  set = (update: T): void => {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch = (): void => {
    const id = this.attributes.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    this.api.fetch(id).then((response: AxiosResponse):void => {
      this.attributes.set(response.data);
    });
  }
  save = (): void => {
    this.api.save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}

import { View } from './View';
import { UserProps } from '../lib/types';
import { User } from '../models/User';

export class UserShow extends View<User, UserProps> {
  template = (): string => (`
    <div>
      <div>User Name: ${this.model.get('name')}</div>
      <div>User Age: ${this.model.get('age')}</div>
    </div>
  `)
}

import { Model } from './Model';
import { Attributes } from './Attributes';
import { Api } from './Api';
import { Events } from './Events';
import { Collection } from './Collection';
import { UserProps } from '../lib/types'

const URL_USERS = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Events(),
      new Api<UserProps>(URL_USERS),
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(URL_USERS, (json: UserProps) => User.buildUser(json));
  }

  setRandomAge = (): void => {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}

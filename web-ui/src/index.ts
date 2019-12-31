import { UserList } from './views/UserList';
import { Collection } from './models/Collection';
import { User } from './models/User';
import { UserProps } from './lib/types';

const USERS_URL = 'http://localhost:3000/users';

const users = new Collection(USERS_URL, (json: UserProps) => User.buildUser(json));

users.on('change', () => {
  const appRoot = document.getElementById('app');

  if (appRoot) {
    new UserList(appRoot, users).render();
  }
});

users.fetch();

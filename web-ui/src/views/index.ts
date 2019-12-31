import { UserForm } from './UserForm';
import { User } from '../models/User';

const user = User.buildUser({
  name: 'Pippa',
  age: 36,
});

const appRoot = document.getElementById('app');

if (appRoot) {
  const userForm = new UserForm(appRoot, user);
  userForm.render();
} else {
  throw new Error('Root element not found.');
}



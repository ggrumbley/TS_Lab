import { User } from './models/User';
import { Collection } from './models/Collection';

const user = new User({ id: 1, name: 'G$', age: 18 });
const userNew = new User({ name: 'Gary', age: 40 });

user.on('save', () => {
  console.log(user);
});

user.save();

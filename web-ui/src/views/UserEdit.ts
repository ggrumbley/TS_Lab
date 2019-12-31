import { View } from './View';
import { User } from '../models/User';
import { UserProps, RegionsMap } from '../lib/types'
import { UserForm } from './UserForm';
import { UserShow } from './UserShow';

export class UserEdit extends View<User, UserProps> {
  regionsMap = (): RegionsMap => ({
    userShow: '.user-show',
    userForm: '.user-form',
  })

  onRender = (): void => {
    new UserShow(this.regions.userShow, this.model).render();
    new UserForm(this.regions.userForm, this.model).render();
  }

  template = (): string => (`
    <div>
      <div class="user-show"></div>
      <div class="user-form"></div>
      <hr />
    </div>
  `)
}

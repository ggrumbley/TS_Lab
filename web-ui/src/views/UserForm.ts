import { View } from './View';
import { UserProps } from '../lib/types';
import { User } from '../models/User';

export class UserForm extends View<User, UserProps> {

  eventsMap = (): { [key: string]: () => void } => ({
    'mouseenter:h1': this.onHeaderHover,
    'click:.set-age': this.onSetAgeClick,
    'click:.set-name': this.onSetNameClick,
    'click:.submit-user': this.onSubmitClick,
  })

  onHeaderHover = (): void => {
    console.log('Hovered over h1');
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  }

  onSubmitClick = (): void => {
    this.model.save();
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');
    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  }

  template = (): string => {
    return `
      <div>
        <input placeholder="${this.model.get('name')}"/>
        <button class="set-name">Update Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="submit-user">Submit</button>
      </div>
    `;
  }

}
